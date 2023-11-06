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

export default function GamerAvatar({
  messageHead,
}: {
  messageHead?: MessageHeadType;
}) {
  const { onOpen, inComingMessage, setInComingMessage, isOpen } =
    useFriendMessages((set) => set);
  const { setCurrentMessage, currentMessage } = useMessageBox((set) => set);
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();
  useEffect(() => {
    if (messageHead) {
      (async () => {
        const { count } = await supabaseClient
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("receiver_id", user?.id)
          .eq("sender_id", messageHead.id)
          .eq("is_seen", false)
          .order("created_at", { ascending: true });

        // const tmp :{ [k: string]: number }  = {...inComingMessage} ;
        // tmp[messageHead.id] = count  ? count : 0;

        inComingMessage[messageHead.id] = count ? count : 0;
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
              if (isOpen) {
                if (currentMessage?.id !== messageHead.id) {
                  const tmp = { ...inComingMessage };
                  tmp[messageHead.id] = inComingMessage[messageHead.id] + 1;

                  setInComingMessage(tmp);
                }
              } else {
                const tmp = { ...inComingMessage };
                tmp[messageHead.id] = inComingMessage[messageHead.id] + 1;

                setInComingMessage(tmp);
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
  console.log(
    messageHead
      ? inComingMessage[messageHead.id] && inComingMessage[messageHead.id] !== 0
        ? inComingMessage[messageHead.id]
        : ""
      : ""
  );
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
                "right-1 absolute top-0 z-10 w-3 h-3 bg-green-500 rounded-full",
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
            <span className="absolute -bottom-2  bg-primary p-1 py-[2px] rounded-sm text-[8px]">
              In Game
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
          <p className="super mt-3 font-bold">Playing Rocket League</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
