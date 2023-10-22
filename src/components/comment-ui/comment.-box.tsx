"use client";

import usePostDetailsModal from "@/hooks/usePostDetailsModal";
import CommentInput from "./comment-input";
import CommentItem from "./comment-item";
import CommentLoading from "./comment-loading";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { CommentType } from "@/types/supabaseTableType";
import { set } from "zod";
import { shallow } from "zustand/shallow";

export default function CommentBox() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const { postId } = usePostDetailsModal((set) => set,shallow);
  const {supabaseClient} = useSessionContext()
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    (async() => {
      // fetch comments
      setLoading(true)
      const {data,error} = await supabaseClient.from("comments").select("*,profiles(*)").eq("post_id",postId)
      if(error) {
        toast.error(error.message)
        return 
      }
      setComments(data)
      setLoading(false)

    })()
    console.log('refefse')
  }, []);
  return (
    <section className="w-full h-full flex flex-col space-y-4">
      {
        comments.length > 0 && comments.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))
      }
      {
        comments.length === 0  && <p className=" text-sm text-muted">No comments yet</p>
      }
      {/* <CommentItem child />
      <CommentItem child />
      <CommentItem child status={false} /> */}
      {loading && <CommentLoading />}
    </section>
  );
}
