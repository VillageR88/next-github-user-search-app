import ButtonTheme from './ButtonTheme';

export default function Navbar() {
  return (
    <nav className="flex size-full max-w-[730px] items-center justify-between">
      <span className="text-[26px] font-bold text-[#222731] transition-colors dark:text-[#FFFFFF]">devfinder</span>
      <ButtonTheme />
    </nav>
  );
}
