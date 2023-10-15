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
  async function fetchHomePosts(reset?: boolean) {
    if (reset) {
      const { data } = await supabaseClient
        .from("posts")
        .select("*, reactions(*)")
        .range(0, 2)
        .order("created_at", { ascending: false });
      if (data!.length === 0 || data!.length < 3) {
        setHasMore(false);
      }
      setPosts([...data!]);
      console.log(data);
    } else {
      const { data } = await supabaseClient
        .from("posts")
        .select("*, reactions(*)")
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
    // console.log("fetch profile");
    // console.log(posts.length);

    if (reset) {
      const { data, error } = await supabaseClient
        .from("posts")
        .select("*, reactions(*)")
        .eq("user_meta_data->>name", username)
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
        .select("*, reactions(*)")
        .eq("user_meta_data->>name", username)
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
    // (async () => {
    //   const { data, error } = await supabaseClient
    //     .from("posts")
    //     .select(
    //       "*, reactions(*,profiles(avatar))"
    //     )
    //     .eq("user_meta_data->>name", username)
    //     .range(0, 2)
    //     .order("created_at", { ascending: false });
    //   if (error) {
    //     console.log(error);
    //     return;
    //   }
    //   console.log("Latest posts with latest reactions:", data);
    // })();
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
      className="mt-10 w-full space-y-9"
    >
      {posts.map((post, ind) => (
        <PostItem key={post.id} {...post} />
      ))}
    </InfiniteScroll>
  );
}
