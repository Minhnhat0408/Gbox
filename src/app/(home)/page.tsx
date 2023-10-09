import NewsList from "@/components/news-list";
import PostDetail from "./post/postDetail";

export default function Home() {
  return <div className="w-full flex h-full px-10 pt-10">
    <section className="w-3/5 h-full">
        <NewsList />
        <PostDetail/>
    </section>
    <section className="flex-1 h-full">

    </section>

  </div>;
}
