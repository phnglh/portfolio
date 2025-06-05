import Intro from '@/components/home/intro';
import Posts from '@/components/home/Posts';

export default function Home() {
  return (
    <>
      <Intro />
      <div className="container px-3 py-16 relative">
        <Posts />
      </div>
    </>
  );
}
