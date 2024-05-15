import { useRef, useState, useEffect, useCallback, useContext } from 'react';
import { DataContext } from '@/app/_providers/DataContext';
import { SidebarContext } from '../_providers/SidebarContext';
import React from 'react';
import Preview from '../components/Preview';
import ButtonPreview from '../components/ButtonPreview';

const Main = () => {
  const [previewOn, setPreviewOn] = useState(false);
  const { dataContext, selected, setDataContext } = useContext(DataContext);
  const { showSidebar, setShowSidebar } = useContext(SidebarContext);
  const [selectedMemo, setSelectedMemo] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });
  const [history, setHistory] = useState<{ text: string; cursorPosition: { start: number; end: number } }[]>([
    { text: '', cursorPosition },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  let textareaScrollTop = 0;
  let previewScrollTop = 0;
  if (textareaRef.current) textareaScrollTop = textareaRef.current.scrollTop;
  if (previewRef.current) previewScrollTop = previewRef.current.scrollTop;

  useEffect(() => {
    if (selected === null) return;
    else if (selected !== selectedMemo) {
      setHistory([{ text: dataContext[selected].content, cursorPosition: { start: 0, end: 0 } }]);
      setSelectedMemo(selected);
      setCurrentIndex(0);
    }
  }, [selected, selectedMemo, dataContext]);

  useEffect(() => {
    if (selected === null) return;
    setHistory([{ text: textareaRef.current?.textContent ?? '', cursorPosition: { start: 0, end: 0 } }]);
  }, [selected]);

  useEffect(() => {
    if (history[1]) {
      if (history[0].cursorPosition === history[1].cursorPosition) return;
      history[0].cursorPosition.start = history[1].cursorPosition.start - 1;
      history[0].cursorPosition.end = history[1].cursorPosition.end - 1;
    }
  }, [history]);

  useEffect(() => {
    if (!textareaRef.current || !previewRef.current) return;
    textareaRef.current.focus();
    textareaRef.current.selectionStart = cursorPosition.start;
    textareaRef.current.selectionEnd = cursorPosition.end;
    textareaRef.current.scrollTo({ top: textareaScrollTop });
    previewRef.current.scrollTo({ top: previewScrollTop });
  }, [cursorPosition, previewScrollTop, textareaScrollTop]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selected === null) return;
    const newText = e.target.value;
    setDataContext((prevData) => {
      const newData = [...prevData];
      newData[selected].content = newText;
      return newData;
    });
    const newCursorPosition = {
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    };
    setCursorPosition(newCursorPosition);
    setHistory((prevHistory) => {
      const newHistory = prevHistory.slice(0, currentIndex + 1);
      newHistory.push({ text: newText, cursorPosition: newCursorPosition });
      return newHistory;
    });
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const undo = useCallback(() => {
    if (selected === null) return;
    if (currentIndex > 0) {
      const previousState = history[currentIndex - 1];
      setDataContext((prevData) => {
        const newData = [...prevData];
        newData[selected].content = previousState.text;
        return newData;
      });
      setCursorPosition(previousState.cursorPosition);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }, [currentIndex, history, selected, setDataContext]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      if (selected === null) return;
      const nextState = history[currentIndex + 1];
      setDataContext((prevData) => {
        const newData = [...prevData];
        newData[selected].content = nextState.text;
        return newData;
      });
      setCursorPosition(nextState.cursorPosition);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }, [currentIndex, history, selected, setDataContext]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
      } else if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    },
    [undo, redo],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const Block = ({
    title,
    children,
    AdditionalIcon,
    additionalClass,
    UndoRedo,
  }: {
    title: string;
    children: React.ReactNode;
    AdditionalIcon: JSX.Element;
    additionalClass?: string;
    UndoRedo?: JSX.Element;
  }) => {
    return (
      <div
        className={`flex h-full ${previewOn ? 'w-full' : 'w-full md:w-1/2'} flex-col ${additionalClass ? additionalClass : ''}`}
      >
        <div className="flex min-h-[42px] w-full items-center justify-between bg-[#F5F5F5] pl-[16px] pr-[17px] transition-colors dark:bg-[#1D1F22]">
          <div className="flex items-center gap-4">
            <span className="text-[14px] font-medium tracking-[2px] text-[#7C8187] transition-colors dark:text-[#C1C4CB]">
              {title}
            </span>
            {UndoRedo && UndoRedo}
          </div>
          {AdditionalIcon}
        </div>
        <div className="flex size-full justify-center">{children}</div>
      </div>
    );
  };

  if (selected === null) return null;
  return (
    <main className="flex size-full justify-center overflow-hidden text-clip bg-[#FFFFFF] transition-all dark:bg-[#151619]">
      {!previewOn && (
        <>
          <Block
            AdditionalIcon={
              <ButtonPreview
                additionalClass="md:hidden"
                previewOn={previewOn}
                func={() => {
                  setPreviewOn(!previewOn);
                }}
              />
            }
            UndoRedo={
              <div className="flex gap-2 md:hidden">
                <button
                  title="Undo"
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={undo}
                  className="flex fill-[#e8eaed] transition-colors hover:fill-[#E46643] disabled:fill-[#5A6069]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px">
                    <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z" />
                  </svg>
                </button>
                <button
                  title="Redo"
                  type="button"
                  disabled={currentIndex === history.length - 1}
                  onClick={redo}
                  className="flex fill-[#e8eaed] transition-colors hover:fill-[#E46643] disabled:fill-[#5A6069]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px">
                    <path d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z" />
                  </svg>
                </button>
              </div>
            }
            title="MARKDOWN"
          >
            <textarea
              title="editor"
              onFocus={() => {
                if (showSidebar) setShowSidebar(false);
              }}
              id="editor"
              ref={textareaRef}
              value={dataContext[selected].content}
              onChange={handleTextChange}
              className="no-scrollbar w-[720px] resize-none border-none bg-transparent px-[18px] pb-[30px] pt-[14px] font-robotoMono text-[14px] leading-[24px] text-[#35393F] outline-none transition-colors dark:text-[#C1C4CB] md:size-full"
            />
          </Block>
          <div className="z-10 min-h-full w-px bg-[#E4E4E4] transition-colors dark:bg-[#5A6069]"></div>
        </>
      )}
      <Block
        additionalClass={previewOn ? '' : 'md:block hidden'}
        AdditionalIcon={
          <ButtonPreview
            previewOn={previewOn}
            func={() => {
              setPreviewOn(!previewOn);
            }}
          />
        }
        title="PREVIEW"
      >
        <Preview previewOn={previewOn} refProp={previewRef} text={dataContext[selected].content} />
      </Block>
    </main>
  );
};

export default Main;
