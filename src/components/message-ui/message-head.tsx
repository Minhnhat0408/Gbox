"use client";

import useMessageBox from "@/hooks/useMessageBox";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { MessageType, ProfilesType } from "@/types/supabaseTableType";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Dot, Play } from "lucide-react";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export default function MessageHead({
  profile,
  setPosition,
}: {
  profile: ProfilesType;
  setPosition: React.Dispatch<React.SetStateAction<ProfilesType[]>>;
}) {
  const { setCurrentMessage, currentMessage } = useMessageBox((set) => set);
  const { user, userDetails } = useUser();
  const { supabaseClient } = useSessionContext();
  const [latestMsg, setLatestMsg] = useState<MessageType | undefined>();
  const [unread, setUnread] = useState(false);
  useEffect(() => {
    let newRoom = userDetails!.name + profile.name;
    newRoom = newRoom.split("").sort().join("");
    const channel = supabaseClient
      .channel(`realtime ${newRoom}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `sender_id=in.(${user?.id},${profile.id})`,
        },
        async (payload) => {
          if (
            payload.new.receiver_id === user?.id ||
            payload.new.receiver_id === profile.id
          ) {
            console.log(currentMessage?.id, profile.id, "unread");
            if (currentMessage?.id !== profile.id) {
              setUnread(true);
            }

            setLatestMsg(payload.new as MessageType);
            setPosition((prev) => {
              const index = prev.findIndex((item) => item.id === profile.id);
              const newPrev = [...prev];
              newPrev.splice(index, 1);
              return [profile, ...newPrev];
            });
          }
        }
      )
      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [profile, currentMessage]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabaseClient
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${user?.id},receiver_id.eq.${user?.id}`)
        .or(`sender_id.eq.${profile.id},receiver_id.eq.${profile.id}`)
        .limit(1)
        .order("created_at", { ascending: false })
        .single();
      if (error) {
        toast.error(error.message);
      }
      if (data) {
        setLatestMsg(data);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentMessage?.id === profile.id) {
      setUnread(false);
    }
  }, [currentMessage]);

  return (
    <div
      onClick={() => {
        setCurrentMessage(profile);
      }}
      className="border-b-2 border-muted  cursor-pointer"
    >
      <div
        className={cn(
          "py-3 px-[10px] flex  rounded-xl    ",
          currentMessage?.id === profile.id && "card-container"
        )}
      >
        <div className="flex flex-1">
          <div id="Image" className="h-full rounded-full flex items-center">
            <Image
              src={profile.avatar || "/image 1.png"}
              alt="image"
              width={1000}
              height={1000}
              className="rounded-full h-[50px] w-[50px] object-cover border-2 border-primary"
            />
          </div>

          <div className="h-full flex justify-center items-center ml-2">
            <div className="h-[60px] flex flex-col justify-center pr-4">
              <p className="font-semibold text-lg">{profile.name}</p>
              <p
                className={cn(
                  "w-full text-sm text-muted-foreground line-clamp-1",
                  unread && "text-white"
                )}
              >
                {latestMsg?.content ? latestMsg.content : "sent new message "}
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
            dayjs(latestMsg?.created_at).format("LT")
          )}
        </div>
      </div>
    </div>
  );
}
