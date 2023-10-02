"use client"

import PostDetail from "@/app/post/postDetail";
import PostForm from "@/app/post/postForm";

export default function Post() {
 
  return (
    <main className="w-screen h-full bg-background flex flex-col relative items-center overflow-hidden">
      <div className="container ">
        <PostDetail></PostDetail>
        <PostForm></PostForm>
      </div>
    </main>
  );
}
