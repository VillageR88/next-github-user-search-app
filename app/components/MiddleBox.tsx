import { tGithubJSON1 } from '../_lib/types';

export default function MiddleBox({ state }: { state: tGithubJSON1 }) {
  return (
    <div className="mt-[23px] flex h-[85px] items-center justify-around rounded-[10px] bg-[#F6F8FF] transition-colors dark:bg-[#141D2F] sm:mt-[32px] sm:pr-[96px] md:justify-between md:pl-[32px] md:pr-[83px]">
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
        <div key={index} className="flex flex-col gap-2 sm:gap-1">
          <span className="text-[11px] text-[#4B6A9B] transition-colors dark:text-[#FFFFFF] sm:text-[13px]">
            {value.title}
          </span>
          <span className="text-[16px] font-bold text-[#2B3442] transition-colors dark:text-[#FFFFFF] sm:text-[22px]">
            {value.description}
          </span>
        </div>
      ))}
    </div>
  );
}
