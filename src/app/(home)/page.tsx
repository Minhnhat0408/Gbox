import CommunityGameUpdate from "@/components/community-game-update/CommunityGameUpdate";
import NewsList from "@/components/news/news-list";
import PostsScroll from "@/components/post-ui/posts-scroll";
import { Separator } from "@/components/ui/separator";
import UpcomingGame from "@/components/upcoming-game/UpcomingGame";

export default async function Home() {
  return (
    <div className="px-7 2xl:py-10 py-7 flex w-full h-full !pt-[72px] relative ">
      <section className="w-3/5 h-full overflow-x-hidden pt-8">
        <NewsList />
        <PostsScroll location="home" />
      </section>
      <section className="flex-1 h-[calc(100vh-84px)] sticky top-0 pt-8 px-3 flex flex-col items-center">
        <CommunityGameUpdate />
        <Separator className="w-[90%] mt-6 mb-4 bg-gray-600" />
        {/* <UpcomingGame /> */}
      </section>
    </div>
  );
}
