import { formatDatePure } from '@/hooks/use-formatted-date';
import { SITE_NAME, SITE_URL } from '@/libs/constants';
import { i18n } from '@/stackhub/i18n/config';
import { getLocalizedPath } from '@/utils/get-localized-path';
import { allBlogs } from 'content-collections';
import { Metadata, ResolvingMetadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { WithContext, Blog } from 'schema-dts';

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
  const t = await getTranslations({ locale, namespace: 'til' });
  const title = t('title');
  const description = t('description');
  const url = getLocalizedPath({ slug: '/blog', locale });

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

const Page = async (props: PageProps) => {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('til');
  const title = t('title');
  const description = t('description');
  const url = `${SITE_URL}${getLocalizedPath({ slug: '/blog', locale })}`;

  const blogs = allBlogs
    .toSorted((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .filter((blog) => blog.locale === locale);

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
    blogPost: allBlogs.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${url}/${post.slug}`,
      datePublished: post.date,
      dateModified: post.modifiedTime,
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container px-3">
        <div className="py-6">
          <h1 className="text-2xl">
            The <em>things</em> I think...
          </h1>
        </div>

        <ul>
          {blogs.map((blog) => (
            <li className="py-4" key={blog.slug}>
              <span className="text-primary/60 text-xs">
                {formatDatePure(blog.date)}
              </span>
              <h2 className="text-2xl font-serif font-medium">
                <a href={`/blog/${blog.slug}`}>{blog.title}</a>
              </h2>
              <p className="text-primary/60">{blog.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Page;
