'use client';

import { usePathname } from '@/stackhub/i18n/routing';
import { useTranslations } from '@/stackhub/i18n/client';
import {
  Bookmark,
  HouseIcon,
  NewspaperIcon,
  UserCircleIcon,
} from 'lucide-react';
import { cn } from '@/stackhub/utils/cn';
import { Link as LocalizedLink } from '@stackhub/i18n/routing';

export const HEADER_LINKS = [
  {
    icon: <HouseIcon className="size-3.5" />,
    href: '/',
    key: 'home',
  },
  {
    icon: <Bookmark className="size-3.5" />,
    href: '/til',
    key: 'til',
  },
  {
    icon: <Bookmark className="size-3.5" />,
    href: '/leetcode',
    key: 'leetcode',
  },
  {
    icon: <NewspaperIcon className="size-3.5" />,
    href: '/blog',
    key: 'blog',
  },
  {
    icon: <UserCircleIcon className="size-3.5" />,
    href: '/about',
    key: 'about',
  },
] as const;

type LinkProps = React.ComponentProps<'a'>;

const Link = (props: LinkProps) => {
  const { href, children, ...rest } = props;

  if (!href) {
    throw new Error('Link must have an href');
  }

  if (href.startsWith('http')) {
    return (
      <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <LocalizedLink href={href} {...rest}>
      {children}
    </LocalizedLink>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <nav className="hidden md:block">
      <ul className="flex gap-2">
        {HEADER_LINKS.map((link) => {
          const isActive = link.href === pathname;

          return (
            <li
              key={link.key}
              className="relative flex h-[60px] items-center justify-center"
            >
              <Link
                className={cn(
                  'rounded-sm px-3 py-2 text-sm font-medium transition-colors',
                  {
                    'text-muted-foreground hover:text-foreground': !isActive,
                    'text-foreground': isActive,
                  }
                )}
                href={link.href}
              >
                {t(`layout.${link.key}`)}
              </Link>
              {isActive ? (
                <>
                  <div className="bg-nav-link-indicator absolute bottom-0 left-1/2 h-px w-12 -translate-x-1/2" />
                  <div className="absolute bottom-0 left-1/2 size-2.5 -translate-x-1/2 rounded-[4px] bg-[rgb(255_122_151)] blur-sm dark:bg-[rgb(223_29_72)]" />
                </>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
