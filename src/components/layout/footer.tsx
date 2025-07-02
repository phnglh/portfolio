'use client';

import { Link } from '@/stackhub/ui';

const Footer = () => {
  return (
    <footer className="bg-background/30 mx-auto mt-12 mb-6 w-full max-w-6xl rounded-2xl backdrop-blur-md">
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm sm:flex-row">
        <span className="text-muted-foreground">
          &copy; {new Date().getFullYear()} phnglh.
        </span>
        <div className="flex gap-4 text-muted-foreground">
          <Link href="https://github.com/phnglh">GitHub</Link>
          <Link href="https://linkedin.com/in/hongphongle/">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
