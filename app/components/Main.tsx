'use client';

import { useFormState } from 'react-dom';
import { createInvoice } from '../_lib/functionsServer';
import type { tGithubJSON1 } from '@/app/_lib/types';
import { octocat } from '../_lib/octocat';
import TopBoxAvatarExcluded from './TopBoxAvatarExcluded';
import MiddleBox from './MiddleBox';
import BottomBox from './BottomBox';
import Avatar from './Avatar';
import Bio from './Bio';

export default function Main() {
  const [state, action] = useFormState<tGithubJSON1, FormData>(createInvoice, octocat);
  //console.log(state);
  return (
    <form action={action} className="flex size-full max-w-[730px] flex-col gap-[24px]">
      <search className="flex h-[69px] w-full items-center justify-between rounded-[15px] bg-[#FFFFFF] pl-[32px] pr-[10px] shadow-[0_15px_15px_0px_rgba(70,96,187,10%)] transition dark:bg-[#1E2A47] dark:shadow-transparent">
        <div className="flex size-full items-center pr-4">
          <svg height="24" width="25" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.609 0c5.85 0 10.608 4.746 10.608 10.58 0 2.609-.952 5-2.527 6.847l5.112 5.087a.87.87 0 01-1.227 1.233l-5.118-5.093a10.58 10.58 0 01-6.848 2.505C4.759 21.16 0 16.413 0 10.58 0 4.747 4.76 0 10.609 0zm0 1.74c-4.891 0-8.87 3.965-8.87 8.84 0 4.874 3.979 8.84 8.87 8.84a8.855 8.855 0 006.213-2.537l.04-.047a.881.881 0 01.058-.053 8.786 8.786 0 002.558-6.203c0-4.875-3.979-8.84-8.87-8.84z"
              fill="#0079ff"
            />
          </svg>
          <input
            name="search"
            id="search"
            className="size-full min-w-[254px] bg-transparent pl-[24px] text-[18px] leading-[25px] text-[#222731] caret-[#0079FF] outline-none transition placeholder:text-[#4B6A9B] dark:text-[#FFFFFF] dark:placeholder:text-[#FFFFFF]"
            placeholder="Search GitHub username…"
            type="text"
            minLength={1}
            required
          />
        </div>
        <div className="flex min-w-fit items-center gap-[24px]">
          <span className={`${state.error ? '' : 'hidden'} min-w-fit font-bold text-[#F74646]`}>No results</span>
          <button
            className="h-[50px] min-w-[106px] rounded-[10px] bg-[#0079FF] text-[16px] font-bold text-[#FFFFFF] transition-colors hover:bg-[#60ABFF]"
            type="submit"
          >
            Search
          </button>
        </div>
      </search>
      <div className="flex min-h-[419px] w-full gap-[37px] rounded-[15px] bg-[#FFFFFF] p-[40px] shadow-[0_15px_15px_0px_rgba(70,96,187,10%)] transition dark:bg-[#1E2A47] dark:shadow-transparent md:px-[48px] md:py-[44px]">
        <Avatar state={state} additionalClass="hidden md:block" />
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-col">
            <div className="flex gap-[41px]">
              <Avatar state={state} additionalClass="md:hidden block" />
              <TopBoxAvatarExcluded state={state} />
            </div>
            <Bio state={state} />
          </div>
          <MiddleBox state={state} />
          <BottomBox state={state} />
        </div>
      </div>
    </form>
  );
}
//4660BB
