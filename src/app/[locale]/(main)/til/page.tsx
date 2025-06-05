// import { SITE_URL } from "@/libs/constants";
import { i18n } from '@/stackhub/i18n/config';
import { getLocalizedPath } from '@/utils/get-localized-path';
import { getTranslations, setRequestLocale } from '@stackhub/i18n/server';
import { Metadata, ResolvingMetadata } from 'next';
import { allTils } from 'content-collections';
import TilList from '@/components/til/list-til';
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
  const url = getLocalizedPath({ slug: '/til', locale });

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
  // const t = await getTranslations("til");
  // const title = t("title");
  // const description = t("description");
  // const url = `${SITE_URL}${getLocalizedPath({ slug: "/blog", locale })}`;

  const til = allTils
    .toSorted((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .filter((til) => til.locale === locale);

  return (
    <>
      <TilList til={til} />
    </>
  );
};

export default Page;
