import Navbar from './components/Navbar';
import Main from './components/Main';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-[36px] p-6 font-spaceMono sm:min-h-screen">
      <Navbar />
      <Main />
    </div>
  );
}
