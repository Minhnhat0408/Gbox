import NewsList from "@/components/news/news-list";

import PostsScroll from "@/components/post-ui/posts-scroll";
import { PostDataType } from "@/types/supabaseTableType";
import {  createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
const supabase = createServerComponentClient({cookies})


export async function fetchMorePosts ({current,amount} : {current:number,amount:number}) {
  const { data }  = await supabase.from("posts").select("*").range(current,current+amount).order("created_at", {ascending: false})
  return data
}
export default async function Home() {

  const { data }  = await supabase.from("posts").select("*").range(0,6).order("created_at", {ascending: false})
  // console.log(data)
  return (
    <div className="flex w-full h-full px-10 py-10 overflow-x-hidden">
      <section className="w-3/5 h-full">
        <NewsList />
        <PostsScroll serverData={data as PostDataType[]} />

      </section>
      <section className="flex-1 h-full"></section>
    </div>
  );
}
