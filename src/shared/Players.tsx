"use client";

import { cn } from "@/lib/utils";

import { useDataContext } from "@/context/DataContext";
import {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
  ReactNode,
} from "react";
import Link from "next/link";
import { Photo } from "@/components/Photo";

import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { ToggleGroup, ToggleGroupItem } from "@ui/toggle-group";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@ui/pagination";

interface PlayersContextType {
  filteredPlayers: any[];
  currentPlayers: any[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  filterRole: string;
  setFilterRole: (role: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  getPaginationItems: (string | number)[];
  itemsPerPage: number;
  setUsePagination: (use: boolean) => void;
}

const PlayersContext = createContext<PlayersContextType | null>(null);

function usePlayersContext() {
  const context = useContext(PlayersContext);
  if (!context) {
    throw new Error("Players components must be used within Players");
  }
  return context;
}

interface PlayersProps {
  data: any;
  children: ReactNode;
  className?: string;
  maxItems?: number;
  pageItems?: number;
  filter?: { key: string; value: string }[];
}

function Players({
  data,
  children,
  className,
  maxItems,
  pageItems,
  filter,
}: PlayersProps) {
  const { isLoading } = useDataContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);
  const [filterRole, setFilterRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [shuffledPlayers, setShuffledPlayers] = useState<any[]>(data || []);
  const [isMounted, setIsMounted] = useState(false);
  const [usePagination, setUsePagination] = useState(false);

  // По умолчанию 16 элементов на страницу, если не указано иное
  const defaultItemsPerPage = 16;
  const itemsPerPage = pageItems ?? defaultItemsPerPage;

  const updateIsDesktop = () => {
    setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
  };

  useEffect(() => {
    setIsMounted(true);
    // Перемешиваем только на клиенте после монтирования
    setShuffledPlayers([...(data || [])].sort(() => Math.random() - 0.5));
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => {
      window.removeEventListener("resize", updateIsDesktop);
    };
  }, [data]);

  const filteredPlayers = useMemo(() => {
    if (!shuffledPlayers || isLoading) return [];

    const getNestedValue = (obj: any, path: string): any => {
      return path.split(".").reduce((current, prop) => current?.[prop], obj);
    };

    let filtered = filter
      ? shuffledPlayers.filter((player) => {
          return filter.every(({ key, value }) => {
            const playerValue = getNestedValue(player, key);
            return playerValue === value;
          });
        })
      : shuffledPlayers;

    // Затем применяем поиск и фильтр по роли
    filtered = filtered.filter((player) => {
      const searchWords = searchTerm
        .toLowerCase()
        .split(/\s+/)
        .filter((word: string) => word.length > 0);

      const playerNameParts = player.name.toLowerCase().split(/\s+/);

      const matchesSearch =
        searchWords.length === 0 ||
        searchWords.every((searchWord: string) =>
          playerNameParts.some((namePart: string) =>
            namePart.includes(searchWord)
          )
        );

      const matchesRole =
        filterRole === "all" ||
        player.role.toLowerCase() === filterRole.toLowerCase();

      return matchesSearch && matchesRole;
    });

    // Если указан maxItems, ограничиваем количество
    if (maxItems !== undefined && maxItems > 0) {
      return filtered.slice(0, maxItems);
    }

    return filtered;
  }, [shuffledPlayers, searchTerm, filterRole, isLoading, maxItems, filter]);

  const totalPages = useMemo(
    () => Math.ceil(filteredPlayers.length / itemsPerPage),
    [filteredPlayers, itemsPerPage]
  );

  // Сбрасываем страницу на 1 при изменении поиска или фильтра
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterRole]);

  // Проверяем, что currentPage не превышает totalPages
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const currentPlayers = useMemo(() => {
    // Если пагинация не используется, показываем всех отфильтрованных игроков
    if (!usePagination) {
      return filteredPlayers;
    }
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredPlayers.slice(start, end);
  }, [currentPage, filteredPlayers, itemsPerPage, usePagination]);

  const getPaginationItems = useMemo(() => {
    const maxVisiblePages = isDesktop ? 9 : 5;

    if (totalPages <= maxVisiblePages + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const middleStart = Math.max(
      2,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const middleEnd = Math.min(
      totalPages - 1,
      middleStart + maxVisiblePages - 1
    );

    pages.push(1);
    if (middleStart > 2) {
      pages.push("ellipsis-start");
    }
    for (let i = middleStart; i <= middleEnd; i++) {
      pages.push(i);
    }
    if (middleEnd < totalPages - 1) {
      pages.push("ellipsis-end");
    }
    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages, isDesktop]);

  const contextValue: PlayersContextType = {
    filteredPlayers,
    currentPlayers,
    totalPages,
    currentPage,
    setCurrentPage,
    filterRole,
    setFilterRole,
    searchTerm,
    setSearchTerm,
    getPaginationItems,
    itemsPerPage,
    setUsePagination,
  };

  return (
    <PlayersContext.Provider value={contextValue}>
      <div id="plrs-grid" className={className}>
        {children}
      </div>
    </PlayersContext.Provider>
  );
}

function PlayersTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("font-bold text-6xl text-[#171D3D] h-14", className)}>
      {children}
    </h2>
  );
}

function PlayersFilters({ className }: { className?: string }) {
  const { filterRole, setFilterRole, searchTerm, setSearchTerm } =
    usePlayersContext();

  return (
    <div
      className={cn(
        "flex flex-col gap-5 font-inter lg:flex-row lg:gap-4",
        className
      )}
    >
      <Input
        id="input-25"
        className="h-8 text-sm lg:text-base rounded-none focus-visible:ring-transparent w-full lg:w-2/12 border-2 border-[#D2D2D2]"
        placeholder="поиск игрока"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ToggleGroup
        className="flex justify-between gap-1 rounded-none lg:gap-4 w-full lg:w-6/12"
        type="single"
        variant="outline"
        value={filterRole}
        onValueChange={(value) => value && setFilterRole(value)}
      >
        {["all", "Нападающий", "Защитник", "Вратарь"].map((role) => (
          <ToggleGroupItem
            key={role}
            className="h-8 text-sm lg:text-base rounded-none border-[#5B5B5B] text-[#5B5B5B] data-[state=on]:bg-[#FF730A] data-[state=on]:border-[#FF730A] data-[state=on]:text-white px-0 w-full"
            value={role}
          >
            {role === "all" ? "все игроки" : role.toLowerCase()}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

function PlayerCard({ item }: { item: any }) {
  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;
  const splitName = (name: string) => {
    const [first, ...rest] = name.trim().split(/\s+/);
    return { first, rest: rest.join(" ") };
  };

  return (
    <Link
      className="group relative w-[calc(50%-0.25rem)] lg:w-[calc(25%-1rem)] border-[#D0D0D0] border rounded-xl overflow-hidden"
      href={item.stats}
      target="_blank"
    >
      <div className="absolute bottom-0 right-0 w-0 h-0 border rounded-xl border-transparent border-b-[#171D3D] border-r-[#171D3D] group-hover:w-full group-hover:h-full transition-all duration-1000 z-20" />
      <div className="absolute top-0 left-0 w-0 h-0 border rounded-xl border-transparent border-t-[#171D3D] border-l-[#171D3D] group-hover:w-full group-hover:h-full transition-all duration-1000 z-20" />
      <div className="flex flex-col rounded-xl bg-white relative z-30 m-[1px] overflow-hidden">
        <Photo
          src={getImageUrl(item.photo)}
          alt={item.name}
          className="w-full aspect-[6/5]"
          fit="cover"
          position="top"
        />
        <div className="border-y border-[#D0D0D0] group-hover:border-[#171D3D] transition-all duration-1000 flex p-2 gap-3 items-center">
          <div>
            {item.team.icon && (
              <Photo
                className="w-7 aspect-square"
                src={getImageUrl(item.team.icon)}
                alt={item.team.name}
                fit="contain"
              />
            )}
          </div>
          <div>
            <h3 className="font-bold text-2xl text-[#171D3D] lg:text-[26px] leading-[21.6px] lg:leading-[26px] w-full">
              {splitName(item.name).first}
              <br />
              {splitName(item.name).rest}
            </h3>
            <p className="font-inter font-semibold text-sm text-[#5B5B5B] h-7 lg:text-base leading-none lg:leading-none">
              {item.team.name}
            </p>
          </div>
        </div>
        <div className="flex justify-between p-2">
          <div>
            <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg">
              {item.birthday}
            </p>
            <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg">
              {item.height}/{item.weight}
            </p>
          </div>
          <div>
            <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg lowercase">
              {item.role}
            </p>
            <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg lowercase">
              {item.grip}
            </p>
          </div>
        </div>
        <Button className="bg-orange-500 group-hover:bg-[#171D3D] mx-3 lg:py-1 lg:px-2 h-auto rounded-none font-normal text-base lg:text-lg leading-none font-inter mb-3">
          статистика
        </Button>
      </div>
    </Link>
  );
}

function PlayersList({
  card: Card = PlayerCard,
  className,
}: {
  card?: React.ComponentType<{ item: any }>;
  className?: string;
}) {
  const { currentPlayers } = usePlayersContext();

  return (
    <div className={cn("flex flex-wrap w-full", className)}>
      {currentPlayers.map((item: any) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

function PlayersPagination({ className }: { className?: string }) {
  const {
    getPaginationItems,
    currentPage,
    setCurrentPage,
    totalPages,
    setUsePagination,
  } = usePlayersContext();

  useEffect(() => {
    setUsePagination(true);
    return () => {
      setUsePagination(false);
    };
  }, [setUsePagination]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
        {getPaginationItems.map((item, index) => {
          if (item === "ellipsis-start" || item === "ellipsis-end") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink
                href="#plrs-grid"
                onClick={() => {
                  if (typeof item === "number") {
                    setCurrentPage(item);
                  }
                }}
                className={`font-inter font-normal text-base rounded-none ${
                  currentPage === item
                    ? "text-white bg-[#FF730A]"
                    : "text-[#1E1E1E]"
                }`}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
}

function PlayersLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Button
      className="text-orange-500 bg-white border border-orange-500 rounded-none mx-auto hover:bg-orange-500 hover:text-white font-normal text-base lg:text-lg leading-none font-inter px-8"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}

export {
  Players,
  PlayersTitle,
  PlayersFilters,
  PlayersList,
  PlayersPagination,
  PlayerCard,
  PlayersLink,
};
