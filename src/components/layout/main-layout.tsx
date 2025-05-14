import Image from 'next/image';
import Headers from './header';
import Footer from './footer';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  return (
    <>
      <Headers />
      <main className="mx-auto mb-16 w-full max-w-5xl flex-1 px-4 py-24 sm:px-8">
        {children}
      </main>
      <Footer />
      <Image
        src="/images/gradient-background-top.png"
        width={1512}
        height={550}
        alt="Gradient background top"
        priority
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2"
      />
      <Image
        width={1512}
        height={450}
        className="absolute -bottom-6 left-1/2 -z-10 -translate-x-1/2"
        src="/images/gradient-background-bottom.png"
        alt="Gradient background bottom"
        priority
      />
    </>
  );
};

export default MainLayout;
