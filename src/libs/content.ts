import { allTils, allNotes,allBlogs } from 'content-collections';

type PostType = 'til' | 'note' | 'blog';

export type Post = ((typeof allTils)[number] | (typeof allNotes)[number] | (typeof allBlogs)[number]) & {
  type: PostType;
};

export function getAllPosts(locale: string): Post[] {
  const tilPosts = allTils
    .filter((post) => post.locale === locale)
    .map((post) => ({ ...post, type: 'til' as const }));
const blogPosts = allBlogs
    .filter((post) => post.locale === locale)
    .map((post) => ({ ...post, type: 'blog' as const }));

  const notePosts = allNotes
    .filter((post) => post.locale === locale)
    .map((post) => ({ ...post, type: 'note' as const }));

  return [...tilPosts, ...notePosts, ...blogPosts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime(); 
  });
}
