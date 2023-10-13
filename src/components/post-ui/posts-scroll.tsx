"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostDataType } from "@/types/supabaseTableType";
import PostItem from "./post-item";
import PostLoading from "./post-loading";
import {  useState } from "react";
import { SupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";

export default function PostsScroll({
  serverData,
}: {
  serverData: PostDataType[];
}) {
  const [posts, setPosts] = useState(serverData);
  const [hasMore, setHasMore] = useState(true);
  const { supabaseClient } = useSessionContext();

  async function fetchMoreData() {
    const { data } = await supabaseClient.from("posts").select("*").range(posts.length, posts.length + 2).order("created_at", { ascending: false });
    if (data!.length === 0) {
      setHasMore(false);
      return;
    }
    setPosts((prev) => [...prev, ...data!]);
  }
  return  (
    <InfiniteScroll
      dataLength={serverData.length}
      next={fetchMoreData}
      style={{ overflow: "visible" }}
      hasMore={false}
      loader={<PostLoading />}
      className="mt-10 w-full space-y-6"
    >
      {posts.map((post, ind) => (
        <PostItem key={ind} {...post} />
      ))}
    </InfiniteScroll>
  );
}
