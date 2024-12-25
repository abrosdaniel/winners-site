"use client";

import { useQuery } from "@tanstack/react-query";

export const fetchData = async () => {
  const response = await fetch("/api/data");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export const useData = (initialData?: any) => {
  return useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5,
    retry: 2,
    initialData,
  });
};
