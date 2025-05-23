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
};

const Mdx = (props: MdxProps) => {
  const { code } = props;
  const MDXContent = useMDXComponent(code);

  return (
    <div className="prose w-full">
      <MDXContent components={components} />
    </div>
  );
};

export default Mdx;
