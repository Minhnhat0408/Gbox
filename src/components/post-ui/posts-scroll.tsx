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
  const [hasMore, setHasMore] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const { supabaseClient } = useSessionContext();
  const { success } = usePostFormModal();

  async function fetchHomePosts(reset?: boolean) {
    if (reset) {
      const { data } = await supabaseClient
        .from("posts")
        .select(
          "*,comments(count), profiles!posts_user_id_fkey(name, avatar, location)"
        )
        .range(0, 5)
        .order("created_at", { ascending: false })
      
      // const {data:reactCount, error} = await supabaseClient.from("reactions").select("*,").eq("post_i", userID)
      if (data!.length === 0 || data!.length < 6) {
        setHasMore(false);
      }
  
      setPosts([...data!]);
    } else {
      const { data } = await supabaseClient
        .from("posts")
        .select(
          "*,comments(count), profiles!posts_user_id_fkey(name, avatar, location)"
        )
        .range(posts.length, posts.length + 5)
      if (data!.length === 0 || data!.length < 6) {
        setHasMore(false);
      }
      setPosts((prev) => [...prev, ...data!]);
    }
  }

  async function reset() {
    setHasMore(false);
    setInitialLoad(true);
    await fetchPosts(true);
    setHasMore(true);
    setInitialLoad(false);
  }

  async function fetchProfilePosts(reset?: boolean) {
    if (reset) {
      const { data, error } = await supabaseClient
        .from("posts")
        .select(
          "*, comments(count), profiles!posts_user_id_fkey(name, avatar, location)"
        )
        .eq("user_id", userID)
        .range(0, 5)
        .order("created_at", { ascending: false })

      if (data!.length < 0 || data!.length < 6) {
        setHasMore(false);
      }
      setPosts(data!);

      return;
    } else {
      const { data, error } = await supabaseClient
        .from("posts")
        .select(
          "*, comments(count), profiles!posts_user_id_fkey(name, avatar, location)"
        )
        .eq("user_id", userID)
        .range(posts.length, posts.length + 5)
        .order("created_at", { ascending: false })

      if (data!.length < 0 || data!.length < 6) {
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
      (async () => {
        await fetchPosts(true);
        setInitialLoad(false);
        setHasMore(true);
      })();
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
      className="mt-10 w-full space-y-9"
      // pullDownToRefresh={true}
      // pullDownToRefreshThreshold={50}
      // refreshFunction={() => {
      //   console.log("hello");
      //   // await reset();
      // }}
    >
      {posts.map((post, ind) => (
        <PostItem key={ind} {...post} />
      ))}
      {initialLoad && <PostLoading />}
    </InfiniteScroll>
  );
}
