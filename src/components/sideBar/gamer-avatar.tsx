import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageHeadType } from "@/types/supabaseTableType";
import useFriendMessages from "@/hooks/useFriendMessages";
import useMessageBox from "@/hooks/useMessageBox";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
// @ts-ignore
import sound from "@/constants/sound";
import useThrottle from "@/hooks/useThrottle";
import useAudio from "@/hooks/useAudio";
import { StatusMessage } from "../profile/UserStatus";

export default function GamerAvatar({
  messageHead,
}: {
  messageHead?: MessageHeadType;
}) {
  const {
    onOpen,
    inComingMessage,
    setInComingMessage,
    isOpen,
    setMessageHeads,
    messageHeads,
  } = useFriendMessages((set) => set);
  const { setCurrentMessage, currentMessage } = useMessageBox((set) => set);
  const { supabaseClient } = useSessionContext();
  const { user, userDetails, usersStatus } = useUser();
  const play = useAudio(sound.message);
  const playSound = useThrottle(() => {
    play.play();
  }, 2000);

  useEffect(() => {
    if (messageHead) {
      (async () => {
        const { count, error } = await supabaseClient
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("receiver_id", user?.id)
          .eq("sender_id", messageHead.id)
          .eq("is_seen", false)
          .order("created_at", { ascending: true });
        if (error) {
          console.error(error);
        }
        inComingMessage[messageHead.id] = count ? count : 0;
        setInComingMessage(inComingMessage);
      })();
      const channel = supabaseClient
        .channel(`incoming ${messageHead.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `sender_id=eq.${messageHead.id}`,
          },
          async (payload) => {
            if (payload.new.receiver_id === user?.id) {
              const index = messageHeads.findIndex(
                (item) => item.id === messageHead.id
              );
              // move it to the top of the messagehead list
              if (index !== -1) {
                const temp = messageHeads[index];
                temp.message_time = payload.new.created_at;
                temp.content = payload.new.content;
                temp.is_seen = payload.new.is_seen;
                temp.sender_id = payload.new.sender_id;
                messageHeads.splice(index, 1);
                messageHeads.unshift(temp);
                setMessageHeads(messageHeads);
              }

              if (isOpen) {
                if (currentMessage?.id !== messageHead.id) {
                  inComingMessage[messageHead.id] += 1;
                  setInComingMessage(inComingMessage);
                }
              } else {
                inComingMessage[messageHead.id] += 1;
                setInComingMessage(inComingMessage);
                playSound();
              }
            }
          }
        )
        .subscribe();

      return () => {
        supabaseClient.removeChannel(channel);
      };
    }
  }, [messageHead]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={() => {
              if (messageHead) {
                setCurrentMessage(messageHead);
                onOpen();
              }
            }}
            className="relative flex justify-center cursor-pointer"
          >
            <Avatar className="w-12 h-12">
              <AvatarImage src={messageHead?.avatar || "image 1.png"} />
              <AvatarFallback className="bg-gray-700">CN</AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "right-1 absolute top-0 z-10 w-3 h-3 bg-transparent rounded-full",
                usersStatus.filter(
                  (item) => item.username === messageHead?.name
                )?.length > 0 && "bg-green-400",
                messageHead &&
                  inComingMessage[messageHead.id] &&
                  inComingMessage[messageHead.id] !== 0 &&
                  "bg-red-400 w-5 h-5 -top-1 right-0 flex items-center justify-center text-sm"
              )}
            >
              {messageHead
                ? inComingMessage[messageHead.id] &&
                  inComingMessage[messageHead.id] !== 0
                  ? inComingMessage[messageHead.id]
                  : ""
                : ""}
            </div>
            <span
              className={cn(
                "absolute -bottom-2 first-letter:capitalize  bg-primary p-1 py-[1px] rounded-sm text-[10px] w-11 text-center",
                messageHead?.role === "coach" && " bg-sky-500",
                messageHead?.role === "admin" && " bg-violet-600"
              )}
            >
              {messageHead
                ? messageHead.role !== "gamer"
                  ? messageHead.role
                  : messageHead.friend_request_status === "friend"
                  ? "Friend"
                  : messageHead.role
                : "Gamer"}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-home p-4">
          <div className="gap-x-2 flex">
            <Avatar className="w-12 h-12">
              <AvatarImage src={messageHead?.avatar || "image 1.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="gap-y-2">
              <p className="">{messageHead ? messageHead.name : "GboxGamer"}</p>
              <span className="text-muted-foreground italic">
                {messageHead ? messageHead.location : "No Where"}
              </span>
            </div>
          </div>
          <p className=" mt-3 font-bold">
            {messageHead ? (
              <StatusMessage
                status_message={messageHead.status_message}
                status={
                  usersStatus.filter(
                    (item) => item.username === messageHead?.name
                  )?.length > 0
                    ? "online"
                    : "offline"
                }
              />
            ) : (
              "No user status found"
            )}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
