import Intro from '@/components/home/intro';
import Posts from '@/components/home/Posts';
import {
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from '@/libs/constants';
import { i18n } from '@/stackhub/i18n/config';
import { getLocalizedPath } from '@/utils/get-localized-path';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from '@stackhub/i18n/server';

import { WebSite, WithContext } from 'schema-dts';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const generateStaticParams = (): Array<{ locale: string }> => {
  return i18n.locales.map((locale) => ({ locale }));
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const { locale } = await props.params;
  const t = await getTranslations('metadata');

  return {
    title: t('site-title'),
    description: t('site-description'),
    keywords: SITE_KEYWORDS.join(', '),
    alternates: {
      canonical: `${SITE_URL}${getLocalizedPath({ slug: '', locale })}`,
    },
    openGraph: {
      title: t('site-title'),
      description: t('site-description'),
      url: `${SITE_URL}${getLocalizedPath({ slug: '', locale })}`,
      siteName: SITE_NAME,
      locale,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/images/og.jpg`,
          width: 1200,
          height: 630,
          alt: t('site-title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('site-title'),
      description: t('site-description'),
      images: [`${SITE_URL}/og-image.png`],
    },
  };
};

const Home = async (props: PageProps) => {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('metadata');

  const url = `${SITE_URL}${getLocalizedPath({ slug: '', locale })}`;
  const jsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t('site-title'),
    description: t('site-description'),
    url,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: [SITE_FACEBOOK_URL, SITE_INSTAGRAM_URL, SITE_GITHUB_URL],
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': SITE_URL,
    },
    inLanguage: locale,
    copyrightYear: new Date().getFullYear(),
    keywords: SITE_KEYWORDS,
    dateCreated: '2020-12-05',
    dateModified: new Date().toISOString(),
  };
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Intro />
      <div className="container px-3 py-16 relative">
        <Posts locale={locale} />
      </div>
    </>
  );
};

export default Home;
