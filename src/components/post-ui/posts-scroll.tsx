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
        .select("*")
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
        .select("*, profiles(*), reactions(*)")
        .range(posts.length, posts.length + 2)
        .order("created_at", { ascending: false });
      if (data!.length === 0 || data!.length < 3) {
        setHasMore(false);
      }
      setPosts((prev) => [...prev, ...data!]);
    }
  }

  async function reset() {
    setHasMore(false);
    setInitialLoad(true);
    console.log("reset");
    await fetchPosts(true);
    setHasMore(true);
    setInitialLoad(false);
  }

  async function fetchProfilePosts(reset?: boolean) {
    if (reset) {
      const { data, error } = await supabaseClient
        .from("posts")
        .select("*, profiles(*), reactions(*)")
        .eq("user_id", userID)
        .range(0, 2)
        .order("created_at", { ascending: false });

      if (data!.length < 0 || data!.length < 3) {
        setHasMore(false);
      }
      setPosts(data!);
      console.log("fetch profile posts reset");
      return;
    } else {
      const { data, error } = await supabaseClient
        .from("posts")
        .select("*, profiles(*), reactions(*)")
        .eq("user_id", userID)
        .range(posts.length, posts.length + 2)
        .order("created_at", { ascending: false });

      if (data!.length < 0 || data!.length < 3) {
        setHasMore(false);
      }
      console.log(posts, "1");
      setPosts((prev) => [...prev, ...data!]);
      console.log("fetch profile posts ");
    }
  }

  const fetchPosts = async (reset?: boolean) => {
    console.log("reset");
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
