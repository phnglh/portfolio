import { Post } from "@/libs/content";

type Props = {
  posts: Array<Post>
}
export default function PostHighlight({posts}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {
    posts.map((entry) => (
      <a
      key={entry.slug}
        className="px-6 py-5 rounded-2xl bg-secondary/50 block hover:no-underline group"
       style={{ backgroundColor: entry.color }}
        href={`/${entry.type}/${entry.slug}`}
        data-astro-prefetch
      >
        <div className="overflow-hidden rounded-2xl">
          <img
            src={entry.illustration}
            alt={entry.title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="flex gap-2">
          <span className="text-subtle text-xs uppercase">{entry.date}</span>
          <span className="text-subtle text-xs">—</span>
          <span className="text-subtle text-xs uppercase">{entry.type}</span>
        </div>
        <h4 className="text-xl font-serif text-balance">{entry.title}</h4>
        <p className="text-primary/60 text-sm text-balance">{entry.excerpt}</p>
      </a>
    ))
  }
</div>
  );
}
