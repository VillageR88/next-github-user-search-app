'use client';

import { useFormState } from 'react-dom';
import { createInvoice } from '../_lib/functionsServer';
import Image from 'next/image';
import type { tGithubJSON1 } from '@/app/_lib/types';
import { LocationSVG, TwitterSvg, WebsiteSvg, CompanySvg } from '@/app/components/SvgComponents';
import { octocat } from '../_lib/octocat';
import BottomRows from './BottomRows';

export default function Main() {
  const notAvailable = 'Not Available';
  const [state, action] = useFormState<tGithubJSON1, FormData>(createInvoice, octocat);
  //console.log(state);
  return (
    <form action={action} className="flex size-full max-w-[730px] flex-col gap-[24px]">
      <search className="flex h-[69px] w-full items-center justify-between rounded-[15px] bg-[#FFFFFF] pl-[32px] pr-[10px] transition-colors dark:bg-[#1E2A47]">
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
      <div className="flex min-h-[419px] w-full gap-[37px] rounded-[15px] bg-[#FFFFFF] transition-colors dark:bg-[#1E2A47] md:px-[48px] md:pt-[44px]">
        <Image
          priority
          className="size-[117px] rounded-full"
          height={117}
          width={117}
          alt="avatar"
          src={state.avatar_url}
        />
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-col">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-[26px] font-bold text-[#2B3442] transition-colors dark:text-[#FFFFFF]">
                  {state.name ? state.name : state.login}
                </span>
                <span className="mt-[2px] text-[16px] text-[#0079FF]">{'@'.concat(state.login)}</span>
              </div>
              <span className="text-[15px] leading-10 text-[#697C9A] transition-colors dark:text-[#FFFFFF]">
                {'Joined '.concat(
                  new Date(state.created_at).toLocaleDateString('en-gb', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }),
                )}
              </span>
            </div>
            <span className="mt-[20px] whitespace-pre-wrap text-[#4B6A9B] transition-colors dark:text-[#FFFFFF]">
              {state.bio ? state.bio : 'This profile has no bio'}
            </span>
          </div>
          <div className="mt-[32px] flex h-[85px]  justify-between rounded-[10px] bg-[#F6F8FF] pl-[26px] pr-[102px] pt-[15px] transition-colors dark:bg-[#141D2F]">
            {[
              { title: 'Repos', description: state.public_repos },
              {
                title: 'Followers',
                description: state.followers,
              },
              {
                title: 'Following',
                description: state.following,
              },
            ].map((value, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-[13px] text-[#4B6A9B] transition-colors dark:text-[#FFFFFF]">{value.title}</span>
                <span className="text-[22px] font-bold text-[#2B3442] transition-colors dark:text-[#FFFFFF]">
                  {value.description}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-x-[62px] gap-y-[19px] pb-[48px] pt-[37px]">
            <BottomRows
              disabled={state.location === null || state.location === ''}
              Svg={LocationSVG}
              description={state.location ? state.location : notAvailable}
              title="Location"
            />
            <BottomRows
              disabled={state.twitter_username === null || state.twitter_username === ''}
              Svg={TwitterSvg}
              description={state.twitter_username ? state.twitter_username : notAvailable}
              title="Twitter"
            />
            <BottomRows
              disabled={state.blog === null || state.blog === ''}
              Svg={WebsiteSvg}
              description={state.blog ? state.blog : notAvailable}
              title="Website"
            />
            <BottomRows
              disabled={state.company === null || state.company === ''}
              Svg={CompanySvg}
              description={state.company ? state.company : notAvailable}
              title="Company"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
