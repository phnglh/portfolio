import type { Metadata, ResolvingMetadata } from 'next';
import { setRequestLocale } from '@stackhub/i18n/server';
import { allLeetcodes } from 'content-collections';
import { notFound } from 'next/navigation';

import { SITE_URL } from '@/libs/constants';
import { getLocalizedPath } from '@/utils/get-localized-path';

import PageTitle from '@/components/page-title';
import Mdx from '@/components/mdx/mdx';
import Providers from '@/components/content-provider';

type PageProps = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const generateStaticParams = (): Array<{
  slug: string;
  locale: string;
}> => {
  return allLeetcodes.map((til) => ({
    slug: til.slug,
    locale: til.locale,
  }));
};

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { slug, locale } = await props.params;

  const leetcode = allLeetcodes.find((p) => p.slug === slug && p.locale === locale);

  if (!leetcode) return {};

  const { date, modifiedTime, title, summary } = leetcode;

  const ISOPublishedTime = new Date(date).toISOString();
  const ISOModifiedTime = new Date(modifiedTime).toISOString();
  const previousOpenGraph = (await parent).openGraph ?? {};
  const url = getLocalizedPath({ slug: `/blog/${slug}`, locale });

  return {
    title: title,
    description: summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...previousOpenGraph,
      url,
      type: 'article',
      title: title,
      description: summary,
      publishedTime: ISOPublishedTime,
      modifiedTime: ISOModifiedTime,
      authors: SITE_URL,
    },
  };
};

const Page = async (props: PageProps) => {
  const { slug, locale } = await props.params;
  setRequestLocale(locale);

  const leetcode = allLeetcodes.find((p) => p.slug === slug && p.locale === locale);

  if (!leetcode) {
    notFound();
  }

  const { title, summary, code } = leetcode;

  return (
    <>
      <PageTitle title={title} description={summary} />
      <Providers post={leetcode}>
        <div className="mt-8 flex flex-col justify-between lg:flex-row">
          <article className="w-full">
            <Mdx code={code} />
          </article>
        </div>
      </Providers>
    </>
  );
};

export default Page;
