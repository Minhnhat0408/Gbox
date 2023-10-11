import NewsList from "@/components/news/news-list";
import PostItem from "@/components/post-ui/post-item";

export default async function Home() {
  return (
    <div className="flex w-full h-full px-10 pt-10 overflow-x-hidden">
      <section className="w-3/5 h-full">
        <NewsList />
        <PostItem/>
      </section>
      <section className="flex-1 h-full"></section>
    </div>
  );
}
