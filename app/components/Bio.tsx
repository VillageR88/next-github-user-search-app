import { tGithubJSON1 } from '../_lib/types';

export default function Bio({ state }: { state: tGithubJSON1 }) {
  return (
    <span className="mt-[20px] whitespace-pre-wrap text-[#4B6A9B] transition-colors dark:text-[#FFFFFF]">
      {state.bio ? state.bio : 'This profile has no bio'}
    </span>
  );
}