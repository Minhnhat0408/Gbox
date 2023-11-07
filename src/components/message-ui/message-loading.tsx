"use client";

import { cn } from "@/lib/utils";

export default function MessageLoading() {
  return (
    <div
      className={cn(
        "  bg-primary w-[200px]   flex animate-pulse self-end p-4 py-8 rounded-2xl"
      )}
    ></div>
  );
}
