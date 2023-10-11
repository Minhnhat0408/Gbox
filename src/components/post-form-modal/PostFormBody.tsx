"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import PostFormMedia from "./PostFormMedia";

function PostFormBody() {
  return (
    <form className="mt-2 space-y-6">
      <div className="w-full gap-4">
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-2 space-y-5">
            <Input
              className=" !bg-black/40 w-full h-[60px] text-lg font-semibold rounded-xl"
              type="text"
              placeholder="Write your post title here..."
            />
            <Textarea
              placeholder="Write your review or post content..."
              className="rounded-xl !bg-black/40 resize-none h-[210px] py-3 appearance-none focus:outline-none leading-[1.25]placeholder-white/20 text-neutral-100"
            />
          </div>
          <PostFormMedia className="col-span-3" />
        </div>
      </div>
      <Button
        type="submit"
        className="rounded-3xl w-full h-14 bg-[rgb(0,240,255)] !mt-8 hover:bg-[rgb(0,240,255)]/80"
      >
        Post Review
      </Button>
    </form>
  );
}

export default PostFormBody;
