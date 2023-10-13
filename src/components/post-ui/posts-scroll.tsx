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
import { usePostFormModal } from "@/hooks/usePostFormModal";

export default function PostsScroll({
  location,
  username,
}: {
  location: "home" | "profile";
  username?: string;
}) {
  const [posts, setPosts] = useState<PostDataType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { supabaseClient } = useSessionContext();
  const { success } = usePostFormModal();
  async function fetchHomePosts() {
    console.log("fetch ");
    console.log(posts.length);
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

  function reset() {
    setPosts([]);
    setHasMore(true);
  }

  async function fetchProfilePosts() {
    console.log("fetch profile");
    console.log(posts.length);
    const { data, error } = await supabaseClient
      .from("posts")
      .select()
      .eq("user_meta_data->>name", username)
      .range(posts.length, posts.length + 2)
      .order("created_at", { ascending: false });

    if (data!.length < 0 || data!.length < 3) {
      setHasMore(false);
    }
    setPosts((prev) => [...prev, ...data!]);
  }

  const fetchPosts = async () => {
    return location === "home" ? fetchHomePosts() : fetchProfilePosts();
  };

  useEffect(() => {
    if (posts.length < 1) {
      fetchPosts();
    }
  }, []);

  useEffect(() => {
    reset();
  }, [success, location]);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchPosts}
      hasMore={hasMore}
      loader={<PostLoading />}
      className="mt-10 w-full space-y-9"
    >
      {posts.map((post, ind) => (
        <PostItem key={ind} {...post} />
      ))}
    </InfiniteScroll>
  );
}
