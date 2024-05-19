import { tGithubJSON1 } from '../_lib/types';
import Image from 'next/image';

export default function Avatar({ state, additionalClass }: { state: tGithubJSON1; additionalClass: string }) {
  return (
    <Image
      priority
      className={`${additionalClass} size-[117px] rounded-full`}
      height={117}
      width={117}
      alt="avatar"
      src={state.avatar_url}
    />
  );
}
