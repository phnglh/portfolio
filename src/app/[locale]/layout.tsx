import type { Metadata } from 'next';
import { Noto_Sans, Noto_Sans_JP, Noto_Sans_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import Providers from '@/app/provider';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { i18n } from '@/stackhub/i18n/config';
import { cn } from '@/stackhub/utils/cn';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/stackhub/i18n/routing';
import { getTranslations } from '@stackhub/i18n/server';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  weight: ['400', '700'],
  display: 'swap',
});

const notoSansMono = Noto_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-noto-sans-mono',
  weight: ['400', '700'],
  display: 'swap',
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export const generateStaticParams = (): Array<{ locale: string }> => {
  return i18n.locales.map((locale) => ({ locale }));
};

export const generateMetadata = async (
  props: LayoutProps
): Promise<Metadata> => {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    metadataBase: new URL('https://localhost:3000'),
    title: {
      default: t('site-title'),
      template: `%s | ${t('site-title')}`,
    },
    description: t('site-description'),
    robots: {
      index: false,
      follow: false,
    },
    manifest: '/favicon/site.webmanifest',
    creator: 'phnglh',
    openGraph: {
      type: 'website',
      title: t('site-title'),
      siteName: t('site-title'),
      description: t('site-description'),
      locale,
      images: [
        {
          url: '/images/og.jpg',
          width: 1200,
          height: 630,
          alt: t('site-description'),
          type: 'image/jpeg',
        },
      ],
    },
    icons: {
      icon: '/favicon/favicon.svg',
      shortcut: '/favicon/favicon.svg',
      apple: [
        {
          url: '/favicon/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          url: '/favicon/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          url: '/favicon/favicon-32x32.png',
        },
      ],
    },
  };
};

const Layout = async (props: LayoutProps) => {
  const { children } = props;
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={cn(notoSans.variable, notoSansMono.variable)}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-screen flex-col">
        <NuqsAdapter>
          <Providers>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
};

export default Layout;
