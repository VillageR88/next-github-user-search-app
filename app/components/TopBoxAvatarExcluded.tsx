import { tGithubJSON1 } from '../_lib/types';

export default function TopBoxAvatarExcluded({ state }: { state: tGithubJSON1 }) {
  return (
    <div className="flex w-full flex-col md:flex-row md:justify-between">
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
  );
}
