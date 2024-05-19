import { tGithubJSON1 } from '../_lib/types';

export default function TopBoxAvatarExcluded({ state }: { state: tGithubJSON1 }) {
  return (
    <div className="flex w-full flex-col md:flex-row md:justify-between">
      <div className="flex flex-col">
        <span className="text-[16px] font-bold text-[#2B3442] transition-colors dark:text-[#FFFFFF] sm:text-[26px]">
          {state.name ? state.name : state.login}
        </span>
        <span className="mt-[2px] text-[13px] text-[#0079FF] sm:text-[16px]">{'@'.concat(state.login)}</span>
      </div>
      <span className="text-[13px] leading-10 text-[#697C9A] transition-colors dark:text-[#FFFFFF] sm:text-[15px]">
        {'Joined '.concat(
          new Date(state.created_at).toLocaleDateString('en-gb', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
        )}
      </span>
    </div>
  );
}
