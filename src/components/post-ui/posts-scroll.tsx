"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostDataType } from "@/types/supabaseTableType";
import PostItem from "./post-item";
import PostLoading from "./post-loading";
import { useEffect, useState } from "react";
import {
  SupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";

export default function PostsScroll({
  location,
}: {
  location: "home" | "profile";
}) {
  const [posts, setPosts] = useState<PostDataType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();

  async function fetchHomePosts() {
    const { data } = await supabaseClient
      .from("posts")
      .select("*")
      .range(posts.length, posts.length + 2)
      .order("created_at", { ascending: false });
    if (data!.length === 0 || data!.length < 3) {
      setHasMore(false);
    }
    setPosts((prev) => [...prev, ...data!]);
  }

  async function fetchProfilePosts() {
    if (user === null) {
      setHasMore(false);
      return;
    }
    const { data } = await supabaseClient
      .from("posts")
      .select()
      .eq("user_id", user.id)
      .range(posts.length, posts.length + 2)
      .order("created_at", { ascending: false });
    if (data!.length === 0 || data!.length < 3) {
      setHasMore(false);
    }
    setPosts((prev) => [...prev, ...data!]);
  }

  const fetchPosts = async () => {
    return location === "home" ? fetchHomePosts() : fetchProfilePosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  console.log(posts,hasMore)
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchPosts}
      hasMore={hasMore}
      loader={<PostLoading />}
      className="mt-10 w-full space-y-6"
    >
      {posts.map((post, ind) => (
        <PostItem key={ind} {...post} />
      ))}
    </InfiniteScroll>
  );
}
