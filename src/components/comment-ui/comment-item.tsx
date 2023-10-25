"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { CommentType } from "@/types/supabaseTableType";
import relativeTime from "dayjs/plugin/relativeTime";

import VideoPlayer from "../video-player/VideoPlayer";
import dayjs from "dayjs";
import CommentInput from "./comment-input";
import { useSessionContext } from "@supabase/auth-helpers-react";
import CommentLoading from "./comment-loading";
import { toast } from "sonner";
import ViewLarge from "../viewLarge";
import { useUser } from "@/hooks/useUser";

dayjs.extend(relativeTime);
export default function CommentItem({
  created_at,
  id,
  media,
  modified_at,
  post_id,
  reply_comment_id,
  text,
  reactions,
  type,
  user_id,
  profiles,
}: CommentType) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(false);
  const [isClamped, setClamped] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subComment, setSubComment] = useState<CommentType[]>([]);
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();
  const [status, setStatus] = useState(0);
  const baseReactions = useRef(0);
  useEffect(() => {
    if (contentRef && contentRef.current) {
      setClamped(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
    let curStatus = 0;
    let up = 0;
    let down = 0;
    reactions.forEach((item) => {
      if (item.user_id === user?.id) {
        if (item.reaction_type === "up") {
          curStatus = 1;
        } else if (item.reaction_type === "down") {
          curStatus = -1;
        } else {
          curStatus = 0;
        }
      } else {
        if (item.reaction_type === "up") {
          up++;
        } else {
          down++;
        }
      }
    });
    baseReactions.current = up - down;
    setStatus(curStatus);
  }, []);

  useEffect(() => {
    if (openReply) {
      const channel = supabaseClient
        .channel("realtime comments")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "comments",
            filter: `reply_comment_id=eq.${id}`,
          },
          async (payload) => {
            const { data } = await supabaseClient
              .from("comments")
              .select("*, profiles(*), reactions(*)")
              .eq("id", payload.new.id)
              .single();
            setSubComment((prev) => [...prev, data]);
          }
        )
        .subscribe();
      return () => {
        supabaseClient.removeChannel(channel);
      };
    }
  }, [openReply]);

  const handleWin = async () => {
    const userPosition = reactions.findIndex(
      (item) => item.user_id === user?.id
    );
    if (status === 1) {
      setStatus(0);
      await supabaseClient
        .from("reactions")
        .delete()
        .eq("user_id", user?.id)
        .eq("comment_id", id);
    } else {
      setStatus(1);
      await supabaseClient.from("reactions").upsert({
        id: userPosition > -1 ? reactions[userPosition]?.id : undefined,
        post_id: post_id,
        user_id: user?.id,
        comment_id: id,
        reaction_type: "up",
        modified_at: new Date(),
      });
    }
    // const { error } = await supabaseClient
    //   .from("reactions")
    //   .upsert({ type: "win", comment_id: id });
    // if (error) {
    //   toast.error(error.message);
    // }
  };

  const handleLose = async () => {
    const userPosition = reactions.findIndex(
      (item) => item.user_id === user?.id
    );
    if (status === -1) {
      setStatus(0);
      await supabaseClient
        .from("reactions")
        .delete()
        .eq("user_id", user?.id)
        .eq("comment_id", id);
    } else {
      setStatus(-1);
      await supabaseClient.from("reactions").upsert({
        id: userPosition > -1 ? reactions[userPosition]?.id : undefined,
        post_id: post_id,
        comment_id: id,
        user_id: user?.id,
        reaction_type: "down",
        modified_at: new Date(),
      });
    }
  };
  useEffect(() => {
    if (openReply) {
      (async () => {
        setLoading(true);
        const { data, error } = await supabaseClient
          .from("comments")
          .select("*,profiles(*),reactions(*)")
          .eq("post_id", post_id)
          .eq("reply_comment_id", id);
        if (error) {
          toast.error(error.message);
        }
        if (data) {
          setSubComment(data);
        }

        setLoading(false);
      })();
    }
  }, [openReply]);
  return (
    <div className={cn(" flex ")}>
      <div className=" mr-3 space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {/* <div className="relative flex justify-center"> */}
              <Avatar
                className={cn(
                  "w-10 h-10 border-primary border-2",
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
        {
          <div
            className={cn(
              " bg-primary text-sm rounded-full text-center ",
              baseReactions.current + status < 0 && " bg-red-400"
            )}
          >
            {" "}
            {baseReactions.current + status}
          </div>
        }
      </div>

      <div className="flex flex-col gap-y-2 w-[100%] ">
        {text !== "" && text !== null && (
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
        )}
        {media && media.type === "image" && (
          <ViewLarge
            src={media.url || "/image 1.png"}
            alt="ava"
            className=" max-w-[250px] w-fit h-auto object-cover"
          />
        )}

        {media && media.type === "video" && (
          <VideoPlayer src={media.url} options={{}} />
        )}
        <div className="flex items-center gap-x-3">
          <button
            onClick={handleWin}
            className={cn(
              "text-xs font-medium text-white hover:text-primary focus:outline-none",
              status === 1 && "text-primary"
            )}
          >
            Win
          </button>
          <button
            onClick={handleLose}
            className={cn(
              "text-xs font-medium text-white hover:text-primary focus:outline-none",
              status === -1 && "text-primary"
            )}
          >
            Lose
          </button>
          {!reply_comment_id && (
            <button
              onClick={() => {
                setOpenReply(!openReply);
              }}
              className="text-xs font-medium text-white hover:text-primary focus:outline-none "
            >
              Reply
            </button>
          )}

          <p className="text-xs font-medium text-muted-foreground  ">
            {dayjs(created_at).fromNow()}
          </p>
        </div>

        {/* {child && <CommentItem />} */}
        {openReply && loading && <CommentLoading />}
        {openReply && (
          <div className="mt-4">
            {subComment.length > 0 &&
              subComment.map((comment) => (
                <CommentItem key={comment.id} {...comment} />
              ))}
          </div>
        )}
        {openReply && <CommentInput replyId={id} />}
      </div>
    </div>
  );
}
