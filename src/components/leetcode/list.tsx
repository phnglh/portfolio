'use client';

import type { Leetcode } from 'content-collections';
import { useTranslations } from '@stackhub/i18n/client';
import { useFormattedDate } from '@/hooks/use-formatted-date';

type LeetcodeListProps = {
  leetcode: Leetcode[];
};

const Card = ({ slug, title, date, locale, tags }: Leetcode) => {
  const formattedDate = useFormattedDate(date);

  return (
    <li key={slug} className="border-b border-border pb-4 ">
      <a href={`/${locale}/leetcode/${slug}`} className='hover:underline'>
        <div>
          <span className="text-subtle text-sm">{formattedDate} — </span>
          <span className="font-medium font-instrument-serif">{title}</span>
        </div>
      </a>
       {tags && tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
    </li>
  );
};


const List = ({ leetcode }: LeetcodeListProps) => {
  const t = useTranslations();

  // const groupByTag = leetcode.reduce(
  //   (acc, entry) => {
  //     for (const tag of entry.tags || []) {
  //       acc[tag] = [...(acc[tag] || []), entry];
  //     }
  //     return acc;
  //   },
  //   {} as Record<string, Leetcode[]>
  // );
  const groupBySeries = leetcode.reduce(
  (acc, entry) => {
    for (const s of entry.series || []) {
      acc[s] = [...(acc[s] || []), entry];
    }
    return acc;
  },
  {} as Record<string, Leetcode[]>
);



  if (leetcode.length === 0) {
    return (
      <div className="my-24 text-center text-xl">
        {t('component.list-blog-posts.no-posts-found')}
      </div>
    );
  }

  return (
    <div className="container px-3 py-24 space-y-12">
      <div>
        <h1 className="text-3xl font-instrument-serif">
          Leetcode
        </h1>
       
      </div>

      <div>
        <h2 className="text-2xl font-instrument-serif">All Posts</h2>
        <ul className="space-y-4 pt-4">
          {leetcode.map((entry) => (
            <Card key={entry.slug} {...entry} />
          ))}
        </ul>
      </div>

      <div className="pt-12 md:pt-24 space-y-8">
        <h2 className="text-2xl font-instrument-serif">Posts by Categories</h2>
        {Object.entries(groupBySeries).map(([s, entries]) => (
          <div key={s} className="space-y-4">
            <h3
              className="text-2xl text-primary font-instrument-serif"
              id={s}
            >
              #{s}
            </h3>
            <ul className="space-y-4">
              {entries.map((entry) => (
                <Card key={entry.slug} {...entry} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
