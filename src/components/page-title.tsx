'use client';

import { Separator } from '@stackhub/ui/separator';
import { motion } from 'motion/react';

type PageTitleProps = {
  title: string;
  description: string;
  hobbies?: string;
  animate?: boolean;
  tags?: string[];
  date?: string;
  extra?: React.ReactNode;
};

const animation = {
  hide: {
    x: -30,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
};

const PageTitle = ({
  title,
  description,
  hobbies,
  animate = true,
  tags,
  date,
  extra,
}: PageTitleProps) => {
  return (
    <div className="relative mb-16 mt-6 sm:mb-24 sm:mt-12">
      <motion.h1
        className="my-4 text-4xl font-bold md:text-5xl"
        {...(animate && {
          initial: animation.hide,
          animate: animation.show,
        })}
      >
        {title}
      </motion.h1>

      <motion.h2
        className="text-muted-foreground mb-1"
        {...(animate && {
          initial: animation.hide,
          animate: animation.show,
          transition: { delay: 0.1 },
        })}
      >
        {description}
      </motion.h2>

{hobbies && (

      <motion.h2
        className="text-muted-foreground mb-4"
        {...(animate && {
          initial: animation.hide,
          animate: animation.show,
          transition: { delay: 0.1 },
        })}
      >
        {hobbies}
      </motion.h2>
)}
      {(date || tags?.length || extra) && (
        <motion.div
          className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground"
          {...(animate && {
            initial: animation.hide,
            animate: animation.show,
            transition: { delay: 0.15 },
          })}
        >
          {date && <span>{date}</span>}
          {tags?.map((tag) => (
            <span
              key={tag}
              className="rounded bg-muted px-2 py-1 text-xs text-foreground"
            >
              #{tag}
            </span>
          ))}
          {extra}
        </motion.div>
      )}

      <Separator className="absolute inset-x-0 translate-y-2 sm:translate-y-6" />
    </div>
  );
};

export default PageTitle;
