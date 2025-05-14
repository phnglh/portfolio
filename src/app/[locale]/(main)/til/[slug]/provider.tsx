'use client';

import type { Til } from 'content-collections';

import { TilProvider } from '@/contexts/til';

type ProvidersProps = {
  children: React.ReactNode;
  post: Til;
};

const Providers = (props: ProvidersProps) => {
  const { children, post } = props;

  return <TilProvider value={post}>{children}</TilProvider>;
};

export default Providers;
