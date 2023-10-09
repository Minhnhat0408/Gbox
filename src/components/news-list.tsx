import NewsItem from "./news-item";

const data = [
  {
    src: "/images/login-bg.png",
    title: "League of Legends",
  },
  {
    src: "/images/login-bg.png",
    title: "League of Legends",
  },
  {
    src: "/images/login-bg.png",
    title: "League of Legends",
  },
];
export default async function NewsList() {
  return (
    <section className="w-1/2 flex gap-x-6" >
      {data.map((item, ind) => {
        return <NewsItem key={ind} src={item.src} title={item.title} className={(ind === 0 ? '-rotate-12' : '')} />;
      })}
    </section>
  );
}
