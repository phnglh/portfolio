'use client';

import { useTranslations } from '@stackhub/i18n/client';
import { linkVariants } from '@stackhub/ui';
import { FOOTER_LINKS } from '@/config/link';
import Link from '../mdx/link';

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="bg-background/30 shadow-xs mx-auto mt-12 mb-6 w-full max-w-6xl rounded-2xl p-8 backdrop-blur-md">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {FOOTER_LINKS.map((list) => (
          <div
            key={list.id}
            className="flex flex-row sm:flex-col md:flex-col gap-3"
          >
            {list.links && (
              <h4 className="text-sm font-semibold uppercase text-muted-foreground">
                {t(`layout.${list.title}`)}
              </h4>
            )}
            {list.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkVariants({ variant: 'muted' })}
              >
                {t(`layout.${link.key}`)}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t pt-6 text-sm sm:flex-row">
        <span className="text-muted-foreground">
          &copy; {new Date().getFullYear()} Henry Le. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
