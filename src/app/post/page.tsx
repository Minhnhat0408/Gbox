"use client"

import PostDetail from "@/app/post/postDetail";
import PostForm from "@/app/post/postForm";
import { usePopupControl } from "@/components/ui/popup";
import { useRef } from "react";

export default function Post() {
  
  const openPostFormRef = useRef<HTMLButtonElement>(null);

  const formControl = usePopupControl(false, openPostFormRef)

  return (
    <main className="w-screen h-full bg-background flex flex-col relative items-center overflow-hidden">
      <div className="container ">
        <PostDetail></PostDetail>
        <PostForm formControl={formControl}></PostForm>
      </div>
      <button ref={openPostFormRef} onClick={() => formControl.setOpen()}>open form</button>

    </main>
  );
}
