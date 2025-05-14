'use client';

import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider } from 'next-themes';
type ProvidesProps = {
  children: React.ReactNode;
};

const Providers = (props: ProvidesProps) => {
  const { children } = props;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      enableColorScheme
      disableTransitionOnChange
    >
      <MDXProvider>{children}</MDXProvider>
    </ThemeProvider>
  );
};

export default Providers;
