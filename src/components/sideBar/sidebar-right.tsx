"use client";

import { cn } from "@/lib/utils";
import { HiChatBubbleLeftRight, HiMiniUserGroup } from "react-icons/hi2";
import GamerAvatar from "./gamer-avatar";
import { Chat } from "../chat/Chat";

export default function SideBarRight() {
  return (
    <aside
      className={cn(
        "fixed  right-4 top-0 fade-in h-full py-6 flex flex-col  overflow-y-scroll gap-y-4 "
      )}
    >
      <div
        className={cn(
          " flex-1 bg-muted rounded-3xl flex flex-col items-center overflow-hidden   py-6  xl:px-4 px-2 "
        )}
      >
        <div className="mb-6 text-4xl">
          <HiMiniUserGroup />
        </div>
        <div className="gap-y-6 scrollbar flex flex-col px-1 overflow-y-scroll">
          <GamerAvatar />
          <GamerAvatar />
          <GamerAvatar />
          <GamerAvatar />
          <GamerAvatar />
          <GamerAvatar />
        </div>
      </div>
      <div
        className={cn(
          " flex-1 bg-muted rounded-3xl flex flex-col items-center overflow-hidden py-6  xl:px-4 px-2  "
        )}
      >
        <div className=" mb-6 text-4xl">
          <Chat />
        </div>
        <div className="gap-y-6 scrollbar flex flex-col px-1 overflow-y-scroll">
          <GamerAvatar />
          <GamerAvatar />
          <GamerAvatar />
          <GamerAvatar />
          <GamerAvatar />
          <GamerAvatar />
        </div>
      </div>
    </aside>
  );
}
