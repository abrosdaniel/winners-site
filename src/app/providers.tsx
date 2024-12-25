"use client";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DataProvider } from "@/context/DataContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 минута
      gcTime: 1000 * 60 * 5, // 5 минут
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  },
});

export function Providers({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState: any;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <DataProvider initialData={dehydratedState?.queries[0]?.state?.data}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </DataProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
