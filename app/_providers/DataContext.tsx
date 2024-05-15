'use client';
import { DocumentJSON } from '@/app/lib/interfaces';
import { createContext, useEffect, useRef, useState } from 'react';
import { handleSaveCollectionGroup } from '../lib/functionsServer';

export const DataContext = createContext(
  {} as {
    dataContext: DocumentJSON[];
    setDataContext: React.Dispatch<React.SetStateAction<DocumentJSON[]>>;
    initialDataContext: React.MutableRefObject<DocumentJSON[]>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    selected: number | null;
    setSelected: React.Dispatch<React.SetStateAction<number | null>>;
    handleAutosave: boolean;
    setHandleAutosave: React.Dispatch<React.SetStateAction<boolean>>;
    showDeleteConfirmation: boolean;
    setShowDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  },
);
export default function DataProvider({ children }: { children: React.ReactNode }) {
  const [dataContext, setDataContext] = useState<DocumentJSON[]>({} as DocumentJSON[]);
  const [selected, setSelected] = useState<number | null>(null);
  const initialDataContext = useRef<DocumentJSON[]>({} as DocumentJSON[]);
  const [token, setToken] = useState<string | null>(null);
  const [handleAutosave, setHandleAutosave] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (!token) return;
    if (!handleAutosave) return;
    void handleSaveCollectionGroup({
      data: JSON.stringify(dataContext),
      token: token,
    }).finally(() => {
      setHandleAutosave(false);
    });
  }, [dataContext, handleAutosave, selected, token]);

  useEffect(() => {
    if (!token) {
      setDataContext([] as DocumentJSON[]);
      initialDataContext.current = [] as DocumentJSON[];
      setSelected(null);
    }
  }, [token]);

  return (
    <DataContext.Provider
      value={{
        showDeleteConfirmation,
        setShowDeleteConfirmation,
        handleAutosave,
        setHandleAutosave,
        dataContext,
        setDataContext,
        initialDataContext,
        token,
        setToken,
        selected,
        setSelected,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
