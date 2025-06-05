import { getAllPosts } from '@/libs/content';
import PostLatest from './PostLatest';
import PostHighlight from './PostHighlight';

 
type PostProps = {
 locale: string
};

export default async function Posts({locale}: PostProps) {
  const allPosts = getAllPosts(locale);
  const content = allPosts.filter((entry) => Boolean(entry.illustration));
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h3 className="text-2xl">
          <em>Journey</em> Diary
        </h3>
        <p className="text-primary/50">The things I think</p>
        <PostHighlight posts={content} />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl">All Posts</h3>
        <PostLatest posts={allPosts} />
      </div>
    </div>
  );
}
