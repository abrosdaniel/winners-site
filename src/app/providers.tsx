"use client";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DataProvider } from "@/context/DataContext";

export function Providers({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState: any;
}) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <HydrationBoundary state={dehydratedState}>
        <DataProvider initialData={dehydratedState?.queries[0]?.state?.data}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </DataProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
