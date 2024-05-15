'use client';

import { useEffect, useState, useRef } from 'react';

enum Theme {
  dark = 'dark',
  light = 'light',
}

export default function ButtonTheme({ sidebarButton }: { sidebarButton?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  useEffect(() => {
    const constantMouseRef = ref.current;
    if (!constantMouseRef) return;
    const handleMouseEnter = () => {
      document.documentElement.classList.add('themeHover');
    };
    const handleMouseLeave = () => {
      document.documentElement.classList.remove('themeHover');
    };
    constantMouseRef.addEventListener('mouseenter', handleMouseEnter);
    constantMouseRef.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      constantMouseRef.removeEventListener('mouseenter', handleMouseEnter);
      constantMouseRef.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);
  useEffect(() => {
    if (theme === null) {
      const value = localStorage.getItem('theme');
      if (value === Theme.dark || value === Theme.light) setTheme(value as Theme);
      else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        setTheme(Theme.dark);
      } else {
        setTheme(Theme.light);
      }
      document.documentElement.classList.remove('hidden');
    }
  }, [theme]);

  useEffect(() => {
    if (theme !== null) {
      if (theme === Theme.dark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', Theme.dark);
        setTheme(Theme.dark);
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', Theme.light);
        setTheme(Theme.light);
      }
    }
  }, [theme]);
  useEffect(() => {
    if (theme !== null && !document.body.classList.contains('transition')) document.body.classList.add('transition');
    return () => {
      document.body.classList.remove('transition');
    };
  }, [theme]);

  if (theme === null) return null;
  else if (sidebarButton)
    return (
      <button
        type="button"
        ref={ref}
        onClick={() => {
          theme === Theme.dark ? setTheme(Theme.light) : setTheme(Theme.dark);
        }}
        className={`flex size-fit items-center fill-white pr-2 transition`}
        title="Toggle Theme"
      >
        <svg
          className={`${theme === Theme.dark ? 'fill-white' : 'fill-[#5A6069]'} transition-colors`}
          xmlns="http://www.w3.org/2000/svg"
          height="18"
          viewBox="0 -960 960 960"
          width="18"
        >
          <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
        </svg>
        <div
          className={`ml-[11.5px] mr-[10px] flex h-[24px] w-[48px] items-center justify-center rounded-[14.5px] bg-[#5A6069] px-[6px] transition-colors`}
        >
          <div
            className={`${theme === Theme.dark ? '-translate-x-3' : 'translate-x-3'} size-[12px] rounded-full bg-[#FFFFFF] transition`}
          ></div>
        </div>
        <svg
          className={`${theme !== Theme.dark ? 'fill-white' : 'fill-[#5A6069]'} transition-colors`}
          xmlns="http://www.w3.org/2000/svg"
          height="18"
          viewBox="0 -960 960 960"
          width="18"
        >
          <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
        </svg>
      </button>
    );
  else
    return (
      <button
        type="button"
        title="Toggle Theme"
        ref={ref}
        onClick={() => {
          theme === Theme.dark ? setTheme(Theme.light) : setTheme(Theme.dark);
        }}
        className={`flex items-center fill-white pr-2 transition`}
      >
        <svg
          className={`${theme === Theme.dark ? 'fill-white' : 'fill-[#C1C4CB]'} transition-colors`}
          xmlns="http://www.w3.org/2000/svg"
          height="18"
          viewBox="0 -960 960 960"
          width="18"
        >
          <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
        </svg>
        <div
          className={`ml-[11.5px] mr-[10px] flex h-[24px] w-[48px] items-center justify-center rounded-[14.5px] border border-[rgba(0,0,0,0.2)] bg-white px-[6px] transition-colors dark:border-transparent dark:bg-[#5A6069]`}
        >
          <div
            className={`${theme === Theme.dark ? '-translate-x-3' : 'translate-x-3'} size-[12px] rounded-full bg-black transition dark:bg-[#FFFFFF]`}
          ></div>
        </div>
        <svg
          className={`${theme !== Theme.dark ? 'fill-black' : 'fill-[#5A6069]'} transition-colors`}
          xmlns="http://www.w3.org/2000/svg"
          height="18"
          viewBox="0 -960 960 960"
          width="18"
        >
          <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
        </svg>
      </button>
    );
}
