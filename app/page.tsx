import ButtonTheme from './components/ButtonTheme';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-spaceMono">
      <nav className="flex size-full max-w-[730px] items-center justify-center">
        <div className="flex w-full justify-between ">
          <span className="text-[26px] font-bold text-[#222731] transition-colors dark:text-[#FFFFFF]">devfinder</span>
          <ButtonTheme />
        </div>
      </nav>
    </div>
  );
}
