'use client';
import { createContext, useState } from 'react';

export const DataContext = createContext(
  {} as {
    pending: boolean;
    setPending: React.Dispatch<React.SetStateAction<boolean>>;
  },
);
export default function DataProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState<boolean>(false);

  return (
    <DataContext.Provider
      value={{
        pending,
        setPending,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
