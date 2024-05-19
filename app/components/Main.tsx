'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createInvoice } from '../_lib/functionsServer';
import type { tGithubJSON1 } from '@/app/_lib/types';
import { octocat } from '../_lib/octocat';
import TopBoxAvatarExcluded from './TopBoxAvatarExcluded';
import MiddleBox from './MiddleBox';
import BottomBox from './BottomBox';
import Avatar from './Avatar';
import Bio from './Bio';
import Image from 'next/image';
import searchIcon from '@/public/assets/icon-search.svg';
import { useContext, useEffect } from 'react';
import { DataContext } from '@/app/_providers/DataContext';

export default function Main() {
  const [state, action] = useFormState<tGithubJSON1, FormData>(createInvoice, octocat);
  const { setPending } = useContext(DataContext);

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    useEffect(() => {
      if (pending) setPending(true);
      else setPending(false);
    }, [pending]);
    return (
      <button
        className="h-[50px] min-w-[84px] rounded-[10px] bg-[#0079FF] text-[14px] font-bold text-[#FFFFFF] transition-colors hover:bg-[#60ABFF] sm:min-w-[106px] sm:text-[16px]"
        type="submit"
      >
        Search
      </button>
    );
  };
  return (
    <form action={action} className="flex size-full max-w-[730px] flex-col gap-[24px]">
      <search className="flex h-[69px] w-full items-center justify-between rounded-[15px] bg-[#FFFFFF] pl-[32px] pr-[10px] shadow-[0_15px_15px_0px_rgba(70,96,187,10%)] transition dark:bg-[#1E2A47] dark:shadow-transparent">
        <div className="flex size-full items-center pr-4">
          <Image
            className="size-[20px] sm:h-[24px] sm:w-[25px]"
            width={25}
            height={24}
            src={searchIcon as string}
            alt="searchIcon"
          />
          <input
            name="search"
            id="search"
            className="size-full bg-transparent pl-[9px] text-[13px] leading-[25px] text-[#222731] caret-[#0079FF] outline-none transition placeholder:text-[#4B6A9B] dark:text-[#FFFFFF] dark:placeholder:text-[#FFFFFF] sm:min-w-[254px] sm:pl-[24px] sm:text-[18px]"
            placeholder="Search GitHub username…"
            type="text"
            minLength={1}
            required
          />
        </div>
        <div className="flex min-w-fit items-center gap-[24px]">
          <span
            className={`${state.error ? '' : 'hidden'} min-w-fit text-[14px] font-bold text-[#F74646] sm:text-[15px]`}
          >
            No results
          </span>
          <SubmitButton />
        </div>
      </search>
      <div className="flex min-h-[419px] w-full gap-[37px] rounded-[15px] bg-[#FFFFFF] px-[24px] pb-[48px] pt-[32px] shadow-[0_15px_15px_0px_rgba(70,96,187,10%)] transition dark:bg-[#1E2A47] dark:shadow-transparent sm:p-[40px] md:px-[48px] md:py-[44px]">
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
