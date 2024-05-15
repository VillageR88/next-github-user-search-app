'use client';

import { useEffect, useContext } from 'react';
import Navbar from './home/Navbar';
import Main from './home/Main';
import { DataContext } from './_providers/DataContext';
import { MainContext } from '@/app/_providers/MainContext';
import Sidebar from './home/Sidebar';
import { handleLoadCollectionGroup } from '@/app/lib/functionsServer';
import { checkToken } from '@/app/lib/functionsServer';
import { useRouter } from 'next/navigation';
import { DocumentJSON } from './lib/interfaces';
import { Routes } from './routes';
import React from 'react';
import BoxConfirmDelete from './components/BoxConfirmDelete';

export default function Home() {
  const {
    initialDataContext,
    setDataContext,
    token,
    setToken,
    dataContext,
    selected,
    setSelected,
    showDeleteConfirmation,
  } = useContext(DataContext);
  const { setLoading } = useContext(MainContext);
  const router = useRouter();

  useEffect(() => {
    if (selected === null && dataContext.length > 0 && dataContext.some((data) => data.name === 'welcome.md')) {
      setSelected(dataContext.findIndex((data) => data.name === 'welcome.md'));
    }
  }, [dataContext, selected, setSelected]);

  useEffect(() => {
    if (!token) {
      setLoading(true);
      void checkToken().then((e) => {
        if (e) {
          setToken(e);
          setLoading(false);
          handleLoadCollectionGroup({ token: e })
            .then((data) => {
              setDataContext(JSON.parse(JSON.stringify(data)) as DocumentJSON[]);
              initialDataContext.current = JSON.parse(JSON.stringify(data)) as DocumentJSON[];
              setLoading(false);
            })
            .catch((error: unknown) => {
              console.error(error);
              router.push(Routes.login);
            });
        } else {
          router.push(Routes.login);
        }
      });
    }
  }, [initialDataContext, router, setDataContext, setLoading, setToken, token]);

  if (token !== null)
    return (
      <div className="absolute flex size-full items-start overflow-hidden">
        {showDeleteConfirmation && (
          <div className="absolute z-20 flex size-full items-center justify-center bg-[#151619]/50 dark:bg-[#7C8187]/50">
            <BoxConfirmDelete />
          </div>
        )}
        <Sidebar />
        <div className="flex size-full flex-col">
          <Navbar token={token} />
          <Main />
        </div>
      </div>
    );
}
