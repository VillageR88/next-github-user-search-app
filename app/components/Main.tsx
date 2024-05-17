'use client';

import { useFormState } from 'react-dom';
import { createInvoice } from '../_lib/functionsServer';
import Image from 'next/image';
import type { tGithubJSON } from '@/app/_lib/types';
import { LocationSVG, TwitterSvg, WebsiteSvg, CompanySvg } from '@/app/components/SvgComponents';

export default function Main() {
  const notAvailable = 'Not Available';
  const [state, action] = useFormState<tGithubJSON, FormData>(createInvoice, {
    login: 'octocat',
    id: 583231,
    node_id: 'MDQ6VXNlcjU4MzIzMQ==',
    avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/octocat',
    html_url: 'https://github.com/octocat',
    followers_url: 'https://api.github.com/users/octocat/followers',
    following_url: 'https://api.github.com/users/octocat/following{/other_user}',
    gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
    organizations_url: 'https://api.github.com/users/octocat/orgs',
    repos_url: 'https://api.github.com/users/octocat/repos',
    events_url: 'https://api.github.com/users/octocat/events{/privacy}',
    received_events_url: 'https://api.github.com/users/octocat/received_events',
    type: 'User',
    site_admin: false,
    name: 'The Octocat',
    company: '@github',
    blog: 'https://github.blog',
    location: 'San Francisco',
    email: null,
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 8,
    public_gists: 8,
    followers: 13500,
    following: 9,
    created_at: '2011-01-25T18:44:36Z',
    updated_at: '2024-04-22T11:20:10Z',
  });
  console.log(state);

  const BottomRows = ({
    description,
    Svg,
    disabled,
  }: {
    description: string;
    Svg: () => JSX.Element;
    disabled: boolean;
  }) => (
    <button
      type="button"
      disabled={disabled}
      className="group1Parrent flex gap-[16px] fill-[#4b6a9b] text-left text-[#4b6a9b] transition-colors disabled:opacity-50 dark:fill-[#FFFFFF] dark:text-[#FFFFFF]"
    >
      <Svg />
      <span className="group1Child max-w-full break-words">{description}</span>
    </button>
  );

  return (
    <form action={action} className="flex size-full max-w-[730px] flex-col gap-[24px]">
      <search className="flex h-[69px] w-full items-center justify-between rounded-[15px] bg-[#FFFFFF] pl-[32px] pr-[10px] transition-colors dark:bg-[#1E2A47]">
        <div className="flex w-full items-center gap-[24px] pr-4">
          <svg height="24" width="25" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.609 0c5.85 0 10.608 4.746 10.608 10.58 0 2.609-.952 5-2.527 6.847l5.112 5.087a.87.87 0 01-1.227 1.233l-5.118-5.093a10.58 10.58 0 01-6.848 2.505C4.759 21.16 0 16.413 0 10.58 0 4.747 4.76 0 10.609 0zm0 1.74c-4.891 0-8.87 3.965-8.87 8.84 0 4.874 3.979 8.84 8.87 8.84a8.855 8.855 0 006.213-2.537l.04-.047a.881.881 0 01.058-.053 8.786 8.786 0 002.558-6.203c0-4.875-3.979-8.84-8.87-8.84z"
              fill="#0079ff"
            />
          </svg>
          <input
            name="search"
            id="search"
            className="w-full min-w-[254px] bg-transparent text-[18px] leading-[25px] text-[#222731] caret-[#0079FF] outline-none transition-colors placeholder:text-[#4B6A9B] dark:text-[#FFFFFF] dark:placeholder:text-[#FFFFFF] "
            placeholder="Search GitHub username…"
            type="text"
            minLength={1}
          />
        </div>
        <button
          className="h-[50px] min-w-[106px] rounded-[10px] bg-[#0079FF] text-[16px] font-bold text-[#FFFFFF]"
          type="submit"
        >
          Search
        </button>
      </search>
      <div className="flex h-[419px] w-full gap-[41px] rounded-[15px] bg-[#FFFFFF] transition-colors dark:bg-[#1E2A47] md:px-[48px] md:pt-[44px]">
        <Image priority className="h-fit rounded-full" height={117} width={117} alt="avatar" src={state.avatar_url} />
        <div className="flex w-full flex-col">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-[26px] font-bold text-[#2B3442] transition-colors dark:text-[#FFFFFF]">
                {state.name}
              </span>
              <span className="mt-[2px] text-[16px] text-[#0079FF]">{'@'.concat(state.login)}</span>
              <span className="mt-[20px] whitespace-pre-wrap text-[#4B6A9B] transition-colors dark:text-[#FFFFFF]">
                {state.bio ? state.bio : 'This profile has no bio'}
              </span>
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
          <div className="mt-[32px] flex h-[85px] justify-between rounded-[10px] bg-[#F6F8FF] pl-[26px] pr-[102px] pt-[15px] transition-colors dark:bg-[#141D2F]">
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
          <div className="mt-[37px] grid grid-cols-2 gap-x-[62px] gap-y-[19px]">
            <BottomRows
              disabled={state.location === null}
              Svg={LocationSVG}
              description={state.location ? state.location : notAvailable}
            />
            <BottomRows
              disabled={state.twitter_username === null}
              Svg={TwitterSvg}
              description={state.twitter_username ? state.twitter_username : notAvailable}
            />
            <BottomRows
              disabled={state.blog === null}
              Svg={WebsiteSvg}
              description={state.blog ? state.blog : notAvailable}
            />
            <BottomRows
              disabled={state.company === null}
              Svg={CompanySvg}
              description={state.company ? state.company : notAvailable}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
