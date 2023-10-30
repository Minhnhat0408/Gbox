"use client";

import usePostDetailsModal from "@/hooks/usePostDetailsModal";
import CommentInput from "./comment-input";
import CommentItem from "./comment-item";
import CommentLoading from "./comment-loading";
import { use, useEffect, useRef, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { shallow } from "zustand/shallow";
import useCommentsControl from "@/hooks/useCommentsControl";
import { supabaseRealtime } from "@/constants/supabase";


export default function CommentBox() {
  const { postId } = usePostDetailsModal((set) => set, shallow);
  const { supabaseClient } = useSessionContext();
  const ref = useRef<HTMLDivElement>(null);
  const { isLoading, setIsLoading, setComments, comments, scroll, setScroll } =
    useCommentsControl((set) => set);
  useEffect(() => {
    (async () => {
      // fetch comments
      setIsLoading(true);

      const { data, error } = await supabaseClient
        .from("comments")
        .select("*, profiles(*), reactions(*)")
        .eq("post_id", postId)
        .is("reply_comment_id", null);
      if (error) {
        toast.error(error.message);
        return;
      }
      setComments(data);
      setIsLoading(false);
    })();
  }, []);


  useEffect(() => {
    //scroll to bottom of the section
    if (comments.length > 0 && scroll) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
      setScroll(false);
    }
  }, [isLoading]);
  return (
    <section className="w-full h-full flex flex-col space-y-5">
      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      {comments.length === 0 && !isLoading && (
        <p className="  text-white h-20 w-full flex justify-center items-center">No comments yet</p>
      )}
      {isLoading && <CommentLoading />}
      <div ref={ref}></div>
    </section>
  );
}
