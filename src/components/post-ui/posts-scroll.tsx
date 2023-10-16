"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostDataType } from "@/types/supabaseTableType";
import PostItem from "./post-item";
import PostLoading from "./post-loading";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { usePostFormModal } from "@/hooks/usePostFormModal";

export default function PostsScroll({
  location,
  userID,
}: {
  location: "home" | "profile";
  userID?: string;
}) {
  const [posts, setPosts] = useState<PostDataType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { supabaseClient } = useSessionContext();
  const { success } = usePostFormModal();
  async function fetchHomePosts(reset?: boolean) {
    if (reset) {
      const { data } = await supabaseClient
        .from("posts")
        .select("*, profiles(*)")
        .range(0, 2)
        .order("created_at", { ascending: false });
      if (data!.length === 0 || data!.length < 3) {
        setHasMore(false);
      }
      setPosts([...data!]);
      console.log("reset");
    } else {
      const { data } = await supabaseClient
        .from("posts")
        .select("*, profiles(*)")
        .range(posts.length, posts.length + 2)
        .order("created_at", { ascending: false });
      if (data!.length === 0 || data!.length < 3) {
        setHasMore(false);
      }
      setPosts((prev) => [...prev, ...data!]);
    }
  }

  function reset() {
    setHasMore(true);
    fetchPosts(true);
  }

  async function fetchProfilePosts(reset?: boolean) {
    if (reset) {
      const { data, error } = await supabaseClient
        .from("posts")
        .select("*, profiles(*)")
        .eq("user_id", userID)
        .range(0, 2)
        .order("created_at", { ascending: false });

      if (data!.length < 0 || data!.length < 3) {
        setHasMore(false);
      }
      setPosts(data!);
      return;
    } else {
      const { data, error } = await supabaseClient
        .from("posts")
        .select("*, profiles(*)")
        .eq("user_id", userID)
        .range(posts.length, posts.length + 2)
        .order("created_at", { ascending: false });

      if (data!.length < 0 || data!.length < 3) {
        setHasMore(false);
      }
      setPosts((prev) => [...prev, ...data!]);
    }
  }

  const fetchPosts = async (reset?: boolean) => {
    return location === "home"
      ? fetchHomePosts(reset)
      : fetchProfilePosts(reset);
  };

  useEffect(() => {
    if (posts.length < 1) {
      fetchPosts(true);
    }
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      reset();
    }
  }, [success]);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchPosts}
      hasMore={hasMore}
      loader={<PostLoading />}
      className="space-y-9 w-full mt-10"
    >
      {posts.map((post, ind) => (
        <PostItem key={ind} {...post} />
      ))}
    </InfiniteScroll>
  );
}
