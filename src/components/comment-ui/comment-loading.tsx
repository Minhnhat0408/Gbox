"use client";

import { cn } from "@/lib/utils";

export default function CommentLoading() {
  return (
    <div className={cn(" flex  max-w-[75%] animate-pulse")}>
      <div className="w-10 h-10 bg-muted rounded-full border-primary border-2 mr-3"></div>

      <div className="flex flex-col gap-y-4 ">
        <div className={cn(" space-y-2 bg-muted p-3  border-primary border-2 rounded-xl")}>
          <p
            className={cn("text-sm font-light line-clamp-3 h-20 w-[400px]")}
          ></p>
        </div>
      </div>
    </div>
  );
}
