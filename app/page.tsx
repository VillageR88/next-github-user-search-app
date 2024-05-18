import Navbar from './components/Navbar';
import Main from './components/Main';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-[36px] py-4 font-spaceMono">
      <Navbar />
      <Main />
    </div>
  );
}
