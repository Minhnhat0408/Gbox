import CommunityGameUpdate from "@/components/community-game-update/CommunityGameUpdate";
import NewsList from "@/components/news/news-list";
import PostsScroll from "@/components/post-ui/posts-scroll";

export default async function Home() {
  return (
    <div className="flex w-full h-full px-10 py-10 overflow-x-hidden">
      <section className="w-3/5 h-full">
        <NewsList />
        <PostsScroll location="home" />
      </section>
      <section className="flex-1 h-full">
        <CommunityGameUpdate />
      </section>
    </div>
  );
}
