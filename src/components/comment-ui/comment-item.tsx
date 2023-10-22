"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { CommentType } from "@/types/supabaseTableType";
import { profile } from "console";
import VideoPlayer from "../video-player/VideoPlayer";

export default function CommentItem({
  created_at,
  id,
  media,
  modified_at,
  post_id,
  reply_comment_id,
  text,
  type,
  user_id,
  profiles,
}: CommentType) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(false);
  const [isClamped, setClamped] = useState(false);
  useEffect(() => {
    if (contentRef && contentRef.current) {
      setClamped(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }

  }, []); 

  return (
    <div className={cn(" flex  max-w-[75%]")}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {/* <div className="relative flex justify-center"> */}
            <Avatar
              className={cn(
                "w-10 h-10 border-primary border-2 mr-3",
                type === "down" && " border-red-400"
              )}
            >
              <AvatarImage src={profiles.avatar || "/image 1.png"} />
              <AvatarFallback className="bg-gray-700">CN</AvatarFallback>
            </Avatar>
            {/* <div className="right-1 absolute top-0 z-10 w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="absolute -bottom-2  bg-primary p-1 py-[2px] rounded-sm text-[8px]">
                In Game
              </span>
            </div> */}
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-home p-4">
            <div className="gap-x-2 flex">
              <Avatar className="w-12 h-12">
                <AvatarImage src={profiles.avatar || "/image 1.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="gap-y-2">
                <p className="">{profiles.name}</p>
                <span className="text-muted-foreground italic">
                  {profiles.location}
                </span>
              </div>
            </div>
            <p className="super mt-3 font-bold">Playing Rocket League</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex flex-col gap-y-4 ">
        <div
          className={cn(
            " space-y-2 w-fit bg-glass p-3 rounded-xl",
            type === "down" && "bg-glass-red "
          )}
        >
          <p
            ref={contentRef}
            className={cn(
              "text-sm font-light",
              reveal ? "line-clamp-none" : "line-clamp-3"
            )}
          >
            {text}
          </p>
          {isClamped && (
            <span
              className="text-sm text-white hover:text-black cursor-pointer "
              onClick={() => {
                setClamped(false);
                setReveal(true);
              }}
            >
              Read more
            </span>
          )}
        </div>
        {media && media.type === "image" && (
          <Image
            src={media.url || "/image 1.png"}
            width={0}
            height={0}
            sizes="100vw"
            alt="ava"
            className=" max-w-[250px] w-fit h-auto object-cover"
          />
        )}

        {media && media.type === "video" && (
          <VideoPlayer src={media.url} options={{}} />
        )}
        <div className="flex items-center">
          <button className="text-xs font-medium text-white hover:text-primary focus:outline-none">
            Win
          </button>
          <button className="text-xs font-medium text-white hover:text-primary focus:outline-none ml-4">
            Lose
          </button>
          <button className="text-xs font-medium text-white hover:text-primary focus:outline-none ml-4">
            Reply
          </button>
        </div>
        {/* {child && <CommentItem />} */}
      </div>
    </div>
  );
}
