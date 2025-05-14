"use client";

import type { Til } from "content-collections";
import { useTranslations } from "@stackhub/i18n/client";
import { useFormattedDate } from "@/hooks/use-formatted-date";

// Props cho component danh sách
type TilsListProps = {
  til: Til[];
};

// Component hiển thị từng bài TIL
const TilCard = ({ slug, title, date, locale }: Til) => {
  const formattedDate = useFormattedDate(date);

  return (
    <li key={slug} className="border-b border-border pb-4">
      <a href={`/${locale}/til/${slug}`}>
        <span className="text-subtle text-sm">{formattedDate} — </span>
        <span className="font-medium font-serif">{title}</span>
      </a>
    </li>
  );
};

// Component chính
const TilsList = ({ til }: TilsListProps) => {
  const t = useTranslations();

  const groupByTag = til.reduce((acc, entry) => {
    for (const tag of entry.tags || []) {
      acc[tag] = [...(acc[tag] || []), entry];
    }
    return acc;
  }, {} as Record<string, Til[]>);

  if (til.length === 0) {
    return (
      <div className="my-24 text-center text-xl">
        {t("component.list-blog-posts.no-posts-found")}
      </div>
    );
  }

  return (
    <div className="container px-3 py-24 space-y-12">
      <div>
        <h1 className="text-3xl font-instrument-serif">
          Which days are the strongest? — <em data-answer>Saturday and Sunday</em>
        </h1>
        <p data-answer>The rest are <em>weekdays</em>.</p>
      </div>

      <div>
        <h2 className="text-2xl font-instrument-serif">All Posts</h2>
        <ul className="space-y-4 pt-4">
          {til.map((entry) => (
            <TilCard key={entry.slug} {...entry} />
          ))}
        </ul>
      </div>

      <div className="pt-12 md:pt-24 space-y-8">
        <h2 className="text-2xl font-instrument-serif">Posts by Categories</h2>
        {Object.entries(groupByTag).map(([tag, entries]) => (
          <div key={tag} className="space-y-4">
            <h3 className="text-2xl text-primary font-instrument-serif" id={tag}>
              #{tag}
            </h3>
            <ul className="space-y-4">
              {entries.map((entry) => (
                <TilCard key={entry.slug} {...entry} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TilsList;
