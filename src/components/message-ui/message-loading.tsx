"use client";

import { cn } from "@/lib/utils";

export default function MessageLoading() {
  return (
    <div
      className={cn(
        " group  bg-primary w-[200px] h-[80px] animate-pulse self-end p-4 py-2 rounded-2xl"
      )}
    ></div>
  );
}
