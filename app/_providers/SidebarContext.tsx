'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

export const SidebarContext = createContext(
  {} as {
    showSidebar: boolean;
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
  },
);

export default function SidebarContextProvider({ children }: { children: ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>{children}</SidebarContext.Provider>;
}
