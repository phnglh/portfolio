import { formatDatePure } from '@/hooks/use-formatted-date';
import { Post } from '@/libs/content';

type PostLatestProps = {
  posts: Array<Post>;
};

export default function PostLatest({ posts }: PostLatestProps) {
  const groupedByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear();
      acc[year] = [...(acc[year] || []), post];
      return acc;
    },
    {} as Record<string, Array<Post>>
  );

  const sortedByYear = Object.entries(groupedByYear).sort((a, b) => {
    return (
      new Date(b[1][0].date).getFullYear() -
      new Date(a[1][0].date).getFullYear()
    );
  });

  return (
    <div className="space-y-4">
      {sortedByYear.map(([year, posts]) => (
        <div className="space-y-4 relative pt-9" key={year}>
          <h3 className="text-4xl text-primary/10 font-instrument-serif absolute pointer-events-none user-select-none top-4 left-0">
            {year}
          </h3>
          <ul className="space-y-4">
            {posts.map((entry) => (
              <li className="border-b border-border pb-4" key={entry.slug}>
                <a href={`/${entry.type}/${entry.slug}`}>
                  <span className="text-subtle text-sm">
                    {formatDatePure(entry.date)} —
                  </span>
                  <span className="text-subtle text-sm">
                    {entry.type}
                    <span className="hidden md:inline"> —</span>
                  </span>
                  <span className="font-medium font-serif block md:inline">
                    {entry.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
