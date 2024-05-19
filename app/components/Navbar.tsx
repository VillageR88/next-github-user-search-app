import ButtonTheme from './ButtonTheme';
import Loader from '@/app/components/Loader';

export default function Navbar() {
  return (
    <nav className="flex size-full max-w-[730px] items-center justify-between">
      <div className="flex gap-4">
        <span className="text-[26px] font-bold text-[#222731] transition-colors dark:text-[#FFFFFF]">devfinder</span>
        <Loader />
      </div>
      <ButtonTheme />
    </nav>
  );
}
