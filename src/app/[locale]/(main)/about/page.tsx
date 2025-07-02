import PageTitle from '@/components/page-title';
import { i18n } from '@/stackhub/i18n/config';
import { allPages } from 'content-collections';
import { getTranslations, setRequestLocale } from '@stackhub/i18n/server';
import { getLocalizedPath } from '@/utils/get-localized-path';
import {
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_URL,
} from '@/libs/constants';
import Mdx from '@/components/mdx/mdx';
import { AboutPage, WithContext } from 'schema-dts';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const getPageMdx = (locale: string) =>
  allPages.find((p) => p.slug === 'about' && p.locale === locale);

export const generateStaticParams = (): Array<{ locale: string }> => {
  return i18n.locales.map((locale) => ({ locale }));
};

export default async function About(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const page = getPageMdx(locale);
  const title = page?.title ?? t('about.title');
  const description = page?.summary ?? t('about.description');
  const tags = page?.tags
  const extra = page?.extra
  const hobbies = page?.hobbies
  const url = `${SITE_URL}${getLocalizedPath({ slug: '/about', locale })}`;

  const jsonLd: WithContext<AboutPage> = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: title,
    description,
    url,
    mainEntity: {
      '@type': 'Person',
      name: title,
      description,
      url: SITE_URL,
      sameAs: [SITE_FACEBOOK_URL, SITE_INSTAGRAM_URL, SITE_GITHUB_URL],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTitle title={title} description={description} hobbies={hobbies} tags={tags} extra={extra}/>
      {!!page?.code && <Mdx code={page.code} />}
    </>
  );  
}
