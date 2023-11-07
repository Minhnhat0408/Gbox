"use client";

import useMessageBox from "@/hooks/useMessageBox";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { MessageHeadType, MessageType } from "@/types/supabaseTableType";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Dot, Play } from "lucide-react";
import dayjs from "dayjs";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { useTypingIndicator } from "@/hooks/useTypingDictator";
import IsTyping from "./is-typing-ui";
import useFriendMessages from "@/hooks/useFriendMessages";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export default function MessageHead({
  messageHead,
}: {
  messageHead: MessageHeadType;
}) {
  const { setCurrentMessage, currentMessage } = useMessageBox((set) => set);
  const { setMessageHeads, messageHeads } = useFriendMessages((set) => set);
  const { user, userDetails } = useUser();
  const { supabaseClient } = useSessionContext();
  const [latestMsg, setLatestMsg] = useState<MessageType | undefined>();

  const [unread, setUnread] = useState(() => {
    if (messageHead.sender_id === user?.id) {
      return false;
    }

    if (messageHead?.is_seen) {
      return false;
    } else {
      if (messageHead?.is_seen === null) {
        return false;
      }
      return true;
    }
  });

  useEffect(() => {
    if (userDetails?.name && messageHead?.name) {
      let newRoom = userDetails?.name + messageHead?.name;
      newRoom = newRoom.split("").sort().join("");

      const channel = supabaseClient
        .channel(`realtime ${newRoom}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `sender_id=in.(${user?.id},${messageHead.id})`,
          },

          async (payload) => {
            if (
              payload.new.receiver_id === user?.id ||
              payload.new.receiver_id === messageHead.id
            ) {
              if (currentMessage?.id !== messageHead.id) {
                setUnread(true);
              }

              setLatestMsg(payload.new as MessageType);
              messageHead.message_time = payload.new.created_at;
              messageHead.content = payload.new.content;
              messageHead.is_seen = payload.new.is_seen;
              messageHead.sender_id = payload.new.sender_id;
              const index = messageHeads.findIndex(
                (item) => item.id === messageHead.id
              );
              messageHeads.splice(index, 1);
              messageHeads.unshift(messageHead);

              setMessageHeads(messageHeads);
            }
          }
        )
        .subscribe();
      return () => {
        supabaseClient.removeChannel(channel);
      };
    }
  }, [messageHead, currentMessage]);
  useEffect(() => {
    if (currentMessage?.id === messageHead.id) {
      setUnread(false);
    }
  }, [currentMessage]);

  return (
    <div
      onClick={() => {
        setCurrentMessage(messageHead);
      }}
      className="border-b-2 border-muted  cursor-pointer"
    >
      <div
        className={cn(
          "py-3 px-[10px] flex  rounded-xl    ",
          currentMessage?.id === messageHead.id && "card-container"
        )}
      >
        <div className="flex flex-1">
          <div id="Image" className="h-fit w-fit ">
            <Image
              src={messageHead.avatar || "/image 1.png"}
              alt="image"
              width={1000}
              height={1000}
              className="bg-center  h-[50px] w-[50px] rounded-full object-cover border-2 border-primary"
            />
          </div>

          <div className="h-full flex-1 justify-center items-center ml-2">
            <div className="h-[60px] flex flex-col justify-center pr-4">
              <p className="font-semibold text-lg">{messageHead.name}</p>
              <p
                className={cn(
                  "w-full text-sm text-muted-foreground line-clamp-1",
                  unread && "text-white"
                )}
              >
                {latestMsg
                  ? latestMsg.sender_id === user?.id
                    ? "You: "
                    : ""
                  : messageHead.sender_id === user?.id
                  ? "You: "
                  : ""}{" "}
                {latestMsg
                  ? latestMsg.content
                    ? latestMsg.content
                    : "sent a media"
                  : messageHead.message_time
                  ? messageHead.content
                    ? messageHead.content
                    : "sent a media"
                  : "No message yet"}
              </p>
            </div>
          </div>
        </div>

        <div
          id="Time"
          className="flex items-center justify-center w-[52px] text-xs relative "
        >
          {unread ? (
            <Dot className="text-primary absolute  h-20 w-20" />
          ) : (
            dayjs(
              latestMsg?.created_at
                ? latestMsg.created_at
                : messageHead.message_time
            ).format("LT")
          )}
        </div>
      </div>
    </div>
  );
}
