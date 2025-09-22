import { i18n } from '@/stackhub/i18n/config';
import { getLocalizedPath } from '@/utils/get-localized-path';
import { getTranslations, setRequestLocale } from '@stackhub/i18n/server';
import { Metadata, ResolvingMetadata } from 'next';
import { allLeetcodes } from 'content-collections';
import { SITE_NAME, SITE_URL } from '@/libs/constants';
import { Blog, BlogPosting, WithContext } from 'schema-dts';
import List from '@/components/leetcode/list';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const generateStaticParams = (): Array<{ locale: string }> => {
  return i18n.locales.map((locale) => ({ locale }));
};

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { locale } = await props.params;
  const previousOpenGraph = (await parent).openGraph ?? {};
  const t = await getTranslations({ locale, namespace: 'leetcode' });
  const title = t('title');
  const description = t('description');
  const url = getLocalizedPath({ slug: '/leetcode', locale });

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...previousOpenGraph,
      url,
      title,
      description,
    },
  };
};

const Leetcode = async (props: PageProps) => {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('leetcode');
  const title = t('title');
  const description = t('description');
  const url = `${SITE_URL}${getLocalizedPath({ slug: '/leetcode', locale })}`;

  const leetcode = allLeetcodes
    .toSorted((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .filter((item) => item.locale === locale);

    console.log(leetcode)
  const jsonLd: WithContext<Blog> = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': url,
    name: title,
    description,
    url,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    blogPost: leetcode.map<BlogPosting>((item) => ({
      '@type': 'BlogPosting',
      headline: item.title,
      url: `${url}/${item.slug}`,
      datePublished: item.date,
      dateModified: item.modifiedTime || item.date,
      author: {
        '@type': 'Person',
        name: SITE_NAME,
        url: SITE_URL,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <List leetcode={leetcode} />
    </>
  );
};

export default Leetcode;
