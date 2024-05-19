import { tGithubJSON1 } from '../_lib/types';

export default function MiddleBox({ state }: { state: tGithubJSON1 }) {
  return (
    <div className="mt-[32px] flex h-[85px] justify-around rounded-[10px] bg-[#F6F8FF] pt-[15px] transition-colors dark:bg-[#141D2F] sm:pr-[96px] md:justify-between md:pl-[32px] md:pr-[83px]">
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
  );
}
