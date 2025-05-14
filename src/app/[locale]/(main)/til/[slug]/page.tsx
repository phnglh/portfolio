import type { Metadata, ResolvingMetadata } from 'next';
import { setRequestLocale } from '@stackhub/i18n/server';
import { allTils } from 'content-collections';
import { notFound } from 'next/navigation';

import { SITE_URL } from '@/libs/constants';
import { getLocalizedPath } from '@/utils/get-localized-path';

import PageTitle from '@/components/page-title';
import Mdx from '@/components/mdx/mdx';
import Providers from './provider';

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
  return allTils.map((til) => ({
    slug: til.slug,
    locale: til.locale,
  }));
};

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { slug, locale } = await props.params;

  const til = allTils.find((p) => p.slug === slug && p.locale === locale);

  if (!til) return {};

  const { date, modifiedTime, title, summary } = til;

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

  const til = allTils.find((p) => p.slug === slug && p.locale === locale);

  if (!til) {
    notFound();
  }

  const { title, summary, code } = til;

  return (
    <>
      <PageTitle title={title} description={summary} />
      <Providers post={til}>
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
