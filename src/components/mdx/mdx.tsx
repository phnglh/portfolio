import { useMDXComponent } from '@content-collections/mdx/react';
import React from 'react';
import Heading from './heading';
import Link from './link';

type MdxProps = {
  code: string;
};

const components = {
  h2: (props: React.ComponentProps<'h2'>) => <Heading as="h2" {...props} />,
  h3: (props: React.ComponentProps<'h3'>) => <Heading as="h3" {...props} />,
  h4: (props: React.ComponentProps<'h4'>) => <Heading as="h4" {...props} />,
  h5: (props: React.ComponentProps<'h5'>) => <Heading as="h5" {...props} />,
  h6: (props: React.ComponentProps<'h6'>) => <Heading as="h6" {...props} />,
  a: (props: React.ComponentProps<'a'>) => {
    const { children, ...rest } = props;
    return (
      <Link
        className="hover:text-foreground text-anchor no-underline transition-colors"
        {...rest}
      >
        {children}
      </Link>
    );
  },
  code: ({
    className,
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"code">) => {
    return (
      <code
        className={`rounded-md bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 px-1.5 py-0.5 font-mono text-sm ${
          className || ""
        }`}
        {...props}
      >
        {children}
      </code>
    );
  },

  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className=" bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 p-4 overflow-x-auto"
      {...props}
    />
  ),
};

const Mdx = (props: MdxProps) => {
  const { code } = props;
  const MDXContent = useMDXComponent(code);

  return (
    <div className="prose w-full max-w-none">
      <MDXContent components={components} />
    </div>
  );
};

export default Mdx;
