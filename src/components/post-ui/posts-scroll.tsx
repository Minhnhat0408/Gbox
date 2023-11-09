"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostDataType } from "@/types/supabaseTableType";
import PostItem from "./post-item";
import PostLoading from "./post-loading";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { usePostFormModal } from "@/hooks/usePostFormModal";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function PostsScroll({
  location,
  userID,
  eventID,
}: {
  location: "home" | "profile" | "event";
  userID?: string;
  eventID?: string;
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
        .eq("is_event_post", false)
        .range(0, 4)
        .order("created_at", { ascending: false });

      // const {data:reactCount, error} = await supabaseClient.from("reactions").select("*,").eq("post_i", userID)
      if (data!.length === 0 || data!.length < 5) {
        setHasMore(false);
      }

      setPosts([...data!]);
    } else {
      const { data } = await supabaseClient
        .from("posts")
        .select(
          "*,comments(count), profiles!posts_user_id_fkey(name, avatar, location)"
        )
        .eq("is_event_post", false)
        .range(posts.length, posts.length + 4)
        .order("created_at", { ascending: false });
      if (data!.length === 0 || data!.length < 5) {
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
        .eq("is_event_post", false)
        .range(0, 4)
        .order("created_at", { ascending: false });

      if (data!.length < 0 || data!.length < 5) {
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
        .eq("is_event_post", false)
        .range(posts.length, posts.length + 4)
        .order("created_at", { ascending: false });

      if (data!.length < 0 || data!.length < 5) {
        setHasMore(false);
      }

      setPosts((prev) => [...prev, ...data!]);
    }
  }

  async function fetchEventPosts(reset?: boolean) {
    if (reset) {
      const { data, error } = await supabaseClient
        .from("posts")
        .select(
          "*, comments(count), profiles!posts_user_id_fkey(name, avatar, location)"
        )
        .eq("event_id", eventID)
        .range(0, 4)
        .order("created_at", { ascending: false });

      if (data!.length < 0 || data!.length < 5) {
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
        .eq("event_id", eventID)
        .range(posts.length, posts.length + 4)
        .order("created_at", { ascending: false });

      if (data!.length < 0 || data!.length < 5) {
        setHasMore(false);
      }

      setPosts((prev) => [...prev, ...data!]);
    }
  }

  const fetchPosts = async (reset?: boolean) => {
    if (location === "home") return fetchHomePosts(reset);
    if (location === "profile") return fetchProfilePosts(reset);
    if (location === "event") return fetchEventPosts(reset);
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
      className={cn("mt-10 w-full space-y-9", {
        "mt-0": location === "event",
      })}
    >
      {posts.map((post, ind) => (
        <PostItem key={ind} {...post} />
      ))}
      {!initialLoad && posts.length === 0 && location === "event" && (
        <div className="w-full center rounded-2xl flex-col flex flex-1">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-32 h-32  mt-4"
          />
          <span className="text-lg h-[120px] center w-full px-4">
            <span>{"There's no discussion at this event"}</span>
          </span>
        </div>
      )}
      {initialLoad && <PostLoading />}
    </InfiniteScroll>
  );
}
