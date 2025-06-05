import { allTils, allNotes } from 'content-collections';

type PostType = 'til' | 'note' | 'blog';

type Post = ((typeof allTils)[number] | (typeof allNotes)[number]) & {
  type: PostType;
};

export function getAllPosts(): Post[] {
  const tilPosts = allTils.map((post) => ({ ...post, type: 'til' as const }));
  const notePosts = allNotes.map((post) => ({
    ...post,
    type: 'note' as const,
  }));

  return [...tilPosts, ...notePosts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}
