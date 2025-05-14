import {
  type IconType,
  SiFacebook,
  SiGithub,
  SiInstagram,
} from '@icons-pack/react-simple-icons';
import { HouseIcon, NewspaperIcon, UserCircleIcon } from 'lucide-react';

import {
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
} from '@/libs/constants';

type SocialLinks = Array<{
  href: string;
  title: string;
  icon: IconType;
}>;

export const HEADER_LINKS = [
  {
    icon: <HouseIcon className="size-3.5" />,
    href: '/',
    key: 'home',
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

export const FOOTER_LINKS = [
  {
    id: 1,
    title: 'general',
    links: [
      { href: '/', key: 'home' },
      { href: '/blog', key: 'blog' },
      { href: '/about', key: 'about' },
    ],
  },
  {
    id: 2,
    title: 'company',
    links: [
      { href: '/about-us', key: 'about-us' },
      { href: '/careers', key: 'careers' },
      { href: '/contact', key: 'contact' },
    ],
  },
  {
    id: 3,
    title: 'social',
    links: [
      { href: SITE_FACEBOOK_URL, key: 'facebook' },
      { href: SITE_INSTAGRAM_URL, key: 'instagram' },
      { href: SITE_GITHUB_URL, key: 'github' },
    ],
  },
] as const;

export const SOCIAL_LINKS: SocialLinks = [
  {
    href: SITE_GITHUB_URL,
    title: 'GitHub',
    icon: SiGithub,
  },
  {
    href: SITE_FACEBOOK_URL,
    title: 'Facebook',
    icon: SiFacebook,
  },
  {
    href: SITE_INSTAGRAM_URL,
    title: 'Instagram',
    icon: SiInstagram,
  },
];
