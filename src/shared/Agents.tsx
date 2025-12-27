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
import { Mail } from "lucide-react";

interface AgentsContextType {
  filteredAgents: any[];
  currentAgents: any[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  getPaginationItems: (string | number)[];
  itemsPerPage: number;
  setUsePagination: (use: boolean) => void;
}

const AgentsContext = createContext<AgentsContextType | null>(null);

function useAgentsContext() {
  const context = useContext(AgentsContext);
  if (!context) {
    throw new Error("Agents components must be used within Agents");
  }
  return context;
}

interface AgentsProps {
  data: any;
  children: ReactNode;
  className?: string;
  maxItems?: number;
  itemsPerPage?: number;
}

function Agents({
  data,
  children,
  className,
  maxItems,
  itemsPerPage: itemsPerPageProp,
}: AgentsProps) {
  const { isLoading } = useDataContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [usePagination, setUsePagination] = useState(false);

  // По умолчанию 16 элементов на страницу, если не указано иное
  const defaultItemsPerPage = 16;
  const itemsPerPage = itemsPerPageProp ?? defaultItemsPerPage;

  const updateIsDesktop = () => {
    setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
  };

  useEffect(() => {
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => {
      window.removeEventListener("resize", updateIsDesktop);
    };
  }, []);

  const filteredAgents = useMemo(() => {
    if (!data || isLoading) return [];

    let filtered = data.filter((agent: any) => {
      const searchWords = searchTerm
        .toLowerCase()
        .split(/\s+/)
        .filter((word: string) => word.length > 0);

      const agentNameParts = agent.name.toLowerCase().split(/\s+/);

      const matchesSearch =
        searchWords.length === 0 ||
        searchWords.every((searchWord: string) =>
          agentNameParts.some((namePart: string) =>
            namePart.includes(searchWord)
          )
        );

      const matchesRole =
        filterType === "all" ||
        agent.type.toLowerCase() === filterType.toLowerCase();

      return matchesSearch && matchesRole;
    });

    // Если указан maxItems, ограничиваем количество
    if (maxItems !== undefined && maxItems > 0) {
      return filtered.slice(0, maxItems);
    }

    return filtered;
  }, [data, searchTerm, filterType, isLoading, maxItems]);

  const totalPages = useMemo(
    () => Math.ceil(filteredAgents.length / itemsPerPage),
    [filteredAgents, itemsPerPage]
  );

  // Сбрасываем страницу на 1 при изменении поиска или фильтра
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  // Проверяем, что currentPage не превышает totalPages
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const currentAgents = useMemo(() => {
    // Если пагинация не используется, показываем всех отфильтрованных игроков
    if (!usePagination) {
      return filteredAgents;
    }
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredAgents.slice(start, end);
  }, [currentPage, filteredAgents, itemsPerPage, usePagination]);

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

  const contextValue: AgentsContextType = {
    filteredAgents,
    currentAgents,
    totalPages,
    currentPage,
    setCurrentPage,
    filterType,
    setFilterType,
    searchTerm,
    setSearchTerm,
    getPaginationItems,
    itemsPerPage,
    setUsePagination,
  };

  return (
    <AgentsContext.Provider value={contextValue}>
      <div id="ags-grid" className={className}>
        {children}
      </div>
    </AgentsContext.Provider>
  );
}

function AgentsTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-bold text-5xl lg:text-6xl text-[#171D3D] h-10 lg:h-14",
        className
      )}
    >
      {children}
    </h2>
  );
}

function AgentsFilters({ className }: { className?: string }) {
  const { filterType, setFilterType, searchTerm, setSearchTerm } =
    useAgentsContext();

  return (
    <div
      className={cn(
        "flex flex-col gap-1 font-inter lg:flex-row lg:gap-2",
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
        className="flex justify-between gap-1 rounded-none lg:gap-2 w-full lg:w-6/12"
        type="single"
        variant="outline"
        value={filterType}
        onValueChange={(value) => value && setFilterType(value)}
      >
        {["all", "Хоккейный агент", "Хоккейный скаут"].map((type) => (
          <ToggleGroupItem
            key={type}
            className="h-8 text-sm lg:text-base rounded-none border-[#5B5B5B] text-[#5B5B5B] data-[state=on]:bg-[#FF730A] data-[state=on]:border-[#FF730A] data-[state=on]:text-white px-0 w-full"
            value={type}
          >
            {type === "all" ? "все агенты" : type.toLowerCase()}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

function AgentCard({ item }: { item: any }) {
  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;
  const splitName = (name: string) => {
    const [first, ...rest] = name.trim().split(/\s+/);
    return { first, rest: rest.join(" ") };
  };

  return (
    <div
      key={item.id}
      className="w-[calc(50%-0.25rem)] flex flex-col pb-6 lg:w-[calc(25%-0.94rem)]"
    >
      <Photo
        className="w-full aspect-square rounded-xl lg:aspect-[6/5]"
        src={getImageUrl(item.photo)}
        alt={item.name}
      />
      <h3 className="font-bold text-2xl leading-6 text-[#171D3D] pt-4 lg:text-3xl lg:leading-8">
        {splitName(item.name).first}
        <br />
        {splitName(item.name).rest}
      </h3>
      <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg">
        {item.type}
      </p>
      <Button
        className="hover:bg-transparent font-normal text-lg leading-none font-inter h-auto pl-0 justify-start py-0"
        variant="link"
        asChild
      >
        <Link href={`mailto:${item.email}`}>
          <Mail className="size-4 text-[#FF730A]" />
          <p className="font-inter font-normal text-base text-[#5B5B5B]">
            {item.email}
          </p>
        </Link>
      </Button>
    </div>
  );
}

function AgentsList({
  card: Card = AgentCard,
  className,
}: {
  card?: React.ComponentType<{ item: any }>;
  className?: string;
}) {
  const { currentAgents } = useAgentsContext();

  return (
    <div className={cn("flex flex-wrap w-full", className)}>
      {currentAgents.map((item: any) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

function AgentsPagination({ className }: { className?: string }) {
  const {
    getPaginationItems,
    currentPage,
    setCurrentPage,
    totalPages,
    setUsePagination,
  } = useAgentsContext();

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
                href="#ags-grid"
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

function AgentsLink({ href, children }: { href: string; children: ReactNode }) {
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
  Agents,
  AgentsTitle,
  AgentsFilters,
  AgentsList,
  AgentsPagination,
  AgentCard,
  AgentsLink,
};
