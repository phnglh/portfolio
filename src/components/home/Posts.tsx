import { getAllPosts } from '@/libs/content';

export default async function Posts() {
  const allPosts = getAllPosts();

  console.log(allPosts);
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h3 className="text-2xl font-instrument-serif">
          <em>Journey</em> Diary
        </h3>
        <p className="text-subtle">The things I think</p>
        {/* <PostHighlight posts={content} /> */}
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-instrument-serif">All Posts</h3>
        {/* <PostLatest posts={allPosts} /> */}
      </div>
    </div>
  );
}
