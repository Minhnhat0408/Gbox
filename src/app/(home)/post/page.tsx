"use client";

import PostDetail from "@/app/(home)/post/postDetail";
import PostForm from "@/app/(home)/post/postForm";
import { usePopupControl } from "@/components/ui/popup";
import { useRef } from "react";

export default function Post() {
  const openPostFormRef = useRef<HTMLButtonElement>(null);

  const formControl = usePopupControl(false, openPostFormRef);

  return (
    <main className="bg-background relative flex flex-col items-center w-screen h-full">
      <div className=" container">
        <PostDetail></PostDetail>
        <PostForm formControl={formControl}></PostForm>
      </div>
      <button ref={openPostFormRef} onClick={() => formControl.setOpen()}>
        open form
      </button>
    </main>
  );
}
