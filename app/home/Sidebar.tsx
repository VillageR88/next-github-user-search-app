import { SidebarContext } from '@/app/_providers/SidebarContext';
import { MainContext } from '@/app/_providers/MainContext';
import { useContext, useRef } from 'react';
import ButtonTheme from '../components/ButtonTheme';
import IconPower from '../components/IconPower';
import { useRouter } from 'next/navigation';
import { Routes } from '@/app/routes';
import { handleSaveCollectionGroup, clearToken } from '@/app/lib/functionsServer';
import { safeContext, createMouseLoader, startMouseLoader, stopMouseLoader } from '@/app/lib/functionsClient';
import { DataContext } from '@/app/_providers/DataContext';
import FileBox from '../components/FileBox';

export default function Sidebar() {
  const router = useRouter();
  const logoutRef = useRef<HTMLButtonElement>(null);
  const { showSidebar, setShowSidebar } = useContext(SidebarContext);
  const { loading } = useContext(MainContext);
  const { dataContext, token, setToken, selected, setSelected, setDataContext, initialDataContext, setHandleAutosave } =
    useContext(DataContext);
  if (token === null) return null;
  return (
    <div
      className={`${showSidebar ? '' : 'ml-[-250px]'} flex h-full min-w-[250px] flex-col justify-center bg-[#1D1F22] px-[24px] transition-all`}
    >
      <div className="flex h-[calc(100%-80px)] flex-col gap-[24px]">
        <div className="flex h-full flex-col gap-[29px]">
          <div className="flex min-h-[85px] flex-col gap-[24px] ">
            <span className="block font-roboto text-[14.5px] font-bold tracking-[5px] text-white lg:hidden">
              MARKDOWN
            </span>
            <span className="font-roboto text-[14px] font-medium tracking-[2px] text-[#7C8187]">MY DOCUMENTS</span>
            <button
              onClick={() => {
                setDataContext((prev) => {
                  let newName = 'untitled-document.md';
                  let newNameCounter = 1;
                  while (dataContext.some((value) => value.name === newName)) {
                    newName = 'untitled-document' + (newNameCounter > 1 ? newNameCounter.toString() : '') + '.md';
                    newNameCounter++;
                  }
                  const newValue = [...prev, { name: newName, content: '', createdAt: new Date().toString() }];
                  initialDataContext.current = newValue;
                  return newValue;
                });
                setSelected(dataContext.length);
                setHandleAutosave(true);
              }}
              className="button2Frame min-h-[40px] w-full font-roboto font-normal"
            >
              + New Document
            </button>
          </div>
          <div className="flex h-[calc(100%-190px)] flex-col gap-[26px] overflow-auto lg:h-[calc(100%-138px)]">
            {dataContext.length > 0 &&
              dataContext.map((value, index) => (
                <FileBox
                  clicked={() => {
                    if (index !== selected) {
                      void handleSaveCollectionGroup({
                        data: JSON.stringify(safeContext({ dataContext: dataContext })),
                        token: token,
                      });
                      setDataContext(safeContext({ dataContext: dataContext }));
                      initialDataContext.current = safeContext({ dataContext: dataContext });
                      setSelected(index);
                    }
                  }}
                  data={value}
                  key={index}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="flex min-h-[25px] w-full items-center justify-between">
        <ButtonTheme sidebarButton />
        <div className="group flex size-[25px] items-center justify-center rounded-full">
          <p className="pointer-events-none absolute mb-[56px] select-none text-sm text-white opacity-0 group-hover:opacity-100">
            Log out
          </p>
          <button
            title="Log out"
            disabled={loading}
            ref={logoutRef}
            onClick={() => {
              if (logoutRef.current) logoutRef.current.disabled = true;
              const mouseLoader = createMouseLoader();
              startMouseLoader({ mouseLoader: mouseLoader });
              void handleSaveCollectionGroup({
                data: JSON.stringify(safeContext({ dataContext: dataContext })),
                token: token,
              });
              void clearToken()
                .then(() => {
                  stopMouseLoader({ mouseLoader: mouseLoader });
                  setShowSidebar(false);
                  router.push(Routes.login);
                })
                .finally(() => {
                  setToken(null);
                });
            }}
            className="flex size-[25px] items-center justify-center rounded-full bg-[#E46643] fill-white px-[4px] text-[15px] font-normal text-white transition hover:bg-[#F39765]"
            type="submit"
          >
            <IconPower />
          </button>
        </div>
      </div>
    </div>
  );
}
