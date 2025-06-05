import { SITE_URL } from '@/libs/constants';
import { getLocalizedPath } from '@/utils/get-localized-path';
import { allBlogs } from 'content-collections';
import { Metadata, ResolvingMetadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

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
  return allBlogs.map((blog) => ({
    slug: blog.slug,
    locale: blog.locale,
  }));
};

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { slug, locale } = await props.params;

  const blog = allBlogs.find((p) => p.slug === slug && p.locale === locale);

  if (!blog) return {};

  const { date, modifiedTime, title, summary } = blog;

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

  const blog = allBlogs.find((p) => p.slug === slug && p.locale === locale);

  if (!blog) {
    notFound();
  }

  const { title, summary, code } = blog;
  return (
    <>
      <h1>{title}</h1>
      <p className="text-primary/30">{summary}</p>
    </>
  );
};
export default Page;
