'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

export const MainContext = createContext(
  {} as {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
  },
);

export default function MainContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);

  return <MainContext.Provider value={{ loading, setLoading }}>{children}</MainContext.Provider>;
}
