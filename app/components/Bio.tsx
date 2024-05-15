import { tGithubJSON1 } from '../_lib/types';

export default function Bio({ state }: { state: tGithubJSON1 }) {
  return (
    <span className="mt-[33px] whitespace-pre-wrap text-[13px] text-[#4B6A9B] transition-colors dark:text-[#FFFFFF] sm:mt-[24px] sm:text-[15px] md:mt-[20px]">
      {state.bio ? state.bio : 'This profile has no bio'}
    </span>
  );
}
