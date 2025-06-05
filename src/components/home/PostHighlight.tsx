export default function PostHighlight() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {posts.map((entry) => (
        <a
          className="px-6 py-5 rounded-2xl bg-secondary/50 block hover:no-underline group"
          style={`background-color: ${entry.data.color}`}
          href={`/${entry.data.type}/${entry.slug}`}
          data-astro-prefetch
        >
          <div className="overflow-hidden rounded-2xl">
            <img
              src={entry.data.illustration}
              alt={entry.data.title}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div className="flex gap-2">
            <span className="text-subtle text-xs uppercase">
              {entry.data.date}
            </span>
            <span className="text-subtle text-xs">—</span>
            <span className="text-subtle text-xs uppercase">
              {entry.data.type}
            </span>
          </div>
          <h4 className="text-xl font-serif text-balance">
            {entry.data.title}
          </h4>
          <p className="text-primary/60 text-sm text-balance">
            {entry.data.excerpt}
          </p>
        </a>
      ))}
    </div>
  );
}
