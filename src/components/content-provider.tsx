'use client';

import type { Til } from 'content-collections';

import { ContentProvider } from '@/contexts/content';

type ProvidersProps = {
  children: React.ReactNode;
  post: Til;
};

const Providers = (props: ProvidersProps) => {
  const { children, post } = props;

  return <ContentProvider value={post}>{children}</ContentProvider>;
};

export default Providers;
