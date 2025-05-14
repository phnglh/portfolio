import { cva, type VariantProps } from 'class-variance-authority';
import NextLink from 'next/link';
import { cn } from '@stackhub/utils/cn';

const linkVariants = cva('', {
  variants: {
    variant: {
      muted: 'text-muted-foreground hover:text-foreground transition-colors',
    },
  },
});

type LinkProps = {
  href: string;
} & Omit<React.ComponentProps<'a'>, 'href'> &
  VariantProps<typeof linkVariants>;

const Link = (props: LinkProps) => {
  const { href, className, children, variant, ...rest } = props;

  const classes = cn(linkVariants({ variant }), className);

  if (href.startsWith('/')) {
    return (
      <NextLink className={classes} href={href} {...rest}>
        {children}
      </NextLink>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
    >
      {children}
    </a>
  );
};

export { Link, linkVariants };
