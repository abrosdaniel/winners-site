"use client";

import { createContext, useContext, useState } from "react";

type DataContextType = {
  data: any;
  isLoading: boolean;
  error: Error | null;
};

const DataContext = createContext<DataContextType>({
  data: {
    news: [],
    players: [],
    agency: [],
    video: [],
  },
  isLoading: false,
  error: null,
});

export function DataProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: any;
}) {
  const [data] = useState(
    initialData || {
      news: [],
      players: [],
      agency: [],
      video: [],
    }
  );
  const [isLoading] = useState(false);
  const [error] = useState<Error | null>(null);

  return (
    <DataContext.Provider value={{ data, isLoading, error }}>
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => useContext(DataContext);
