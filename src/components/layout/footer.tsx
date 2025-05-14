'use client';

import { useTranslations } from '@stackhub/i18n/client';

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="bg-background/30 mx-auto mt-12 mb-6 w-full max-w-6xl rounded-2xl p-8 backdrop-blur-md">
      <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t pt-6 text-sm sm:flex-row">
        <span className="text-muted-foreground">
          &copy; {new Date().getFullYear()} Henry Le. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
