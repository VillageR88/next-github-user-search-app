import { tGithubJSON1 } from '../_lib/types';
import BottomRows from './BottomRows';
const notAvailable = 'Not Available';
import { LocationSVG, TwitterSvg, WebsiteSvg, CompanySvg } from '@/app/components/SvgComponents';

export default function BottomBox({ state }: { state: tGithubJSON1 }) {
  return (
    <div className="grid gap-x-[62px] gap-y-[19px] pt-[24px] text-[13px] sm:grid-cols-2 sm:pt-[37px] sm:text-[15px]">
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
  );
}
