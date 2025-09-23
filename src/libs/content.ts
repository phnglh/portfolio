import { allTils, allNotes, allBlogs, allLeetcodes } from 'content-collections';

type PostType = 'til' | 'note' | 'blog' | 'leetcode'

export type Post = (
  | (typeof allTils)[number]
  | (typeof allNotes)[number]
  | (typeof allBlogs)[number]
  | (typeof allLeetcodes)[number]
) & {
  type: PostType;
};

export function getAllPosts(locale: string): Post[] {
  const tilPosts = allTils
    .filter((post) => post.locale === locale)
    .map((post) => ({ ...post, type: 'til' as const }));

  const leetcodePost = allLeetcodes
    .filter((post) => post.locale === locale)
    .map((post) => ({ ...post, type: 'leetcode' as const }));

  const blogPosts = allBlogs
    .filter((post) => post.locale === locale)
    .map((post) => ({ ...post, type: 'blog' as const }));

  const notePosts = allNotes
    .filter((post) => post.locale === locale)
    .map((post) => ({ ...post, type: 'note' as const }));

  return [...tilPosts, ...notePosts, ...blogPosts, ...leetcodePost].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}
