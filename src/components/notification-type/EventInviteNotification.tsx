"use client";

import {
  EventInviteMetadataType,
  EventInviteNotificationType,
} from "@/types/supabaseTableType";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BsFillEnvelopeCheckFill } from "react-icons/bs";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { cn } from "@/lib/utils";

dayjs.extend(relativeTime);

const EventInviteNotification = ({
  data,
}: {
  data: EventInviteNotificationType;
}) => {
  const router = useRouter();

  const { supabaseClient } = useSessionContext();

  const [confirm, setConfirm] = useState({
    isAccept: data.notification_meta_data.is_accepted,
    isLoading: false,
  });

  const handleNotParticipate = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (confirm.isAccept) return router.push(data.link_to!);
    if (confirm.isLoading) return;
    setConfirm({
      isAccept: confirm.isAccept,
      isLoading: true,
    });
    const { data: updateData, error } = await supabaseClient
      .from("notifications")
      .update({
        notification_meta_data: {
          ...(data.notification_meta_data as EventInviteMetadataType),
          is_accepted: true,
        },
        is_readed: true,
        created_at: new Date(),
      })
      .eq("id", data.id);
    setConfirm({
      isAccept: true,
      isLoading: false,
    });
  };

  const handleAcceptEvent = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (confirm.isAccept) return router.push(data.link_to!);
    if (confirm.isLoading) return;
    setConfirm({
      isAccept: confirm.isAccept,
      isLoading: true,
    });
    const { data: updateData, error } = await supabaseClient
      .from("notifications")
      .update({
        notification_meta_data: {
          ...(data.notification_meta_data as EventInviteMetadataType),
          is_accepted: true,
        },
        is_readed: true,
        created_at: new Date(),
      })
      .eq("id", data.id);
    setConfirm({
      isAccept: true,
      isLoading: false,
    });
    router.push(data.link_to!);
  };

  return (
    <div
      onClick={handleAcceptEvent}
      className={cn(
        "flex items-center relative h-[150px] rounded-2xl cursor-pointer p-3 py-4 pr-9 hover:bg-black/30",
        {
          "animate-pulse": confirm.isLoading,
          "h-24": confirm.isAccept,
        }
      )}
    >
      {!data.is_readed && (
        <div className="h-full absolute center top-0 bottom-0 right-3">
          <span className="w-3 h-3 rounded-full bg-green-400"></span>
        </div>
      )}
      <div className="relative center w-fit h-fit mr-5">
        <Avatar className="w-[60px] h-[60px]">
          <AvatarImage
            className="object-cover object-center w-auto h-full select-none"
            src={data.notification_meta_data.sender_avatar || "/avatar.jpg"}
          />
          <AvatarFallback>{"A"}</AvatarFallback>
        </Avatar>
        <div className="center rounded-full bg-red-400 h-7 w-7 absolute -bottom-1 -right-1">
          <BsFillEnvelopeCheckFill className="text-lg text-white" />
        </div>
      </div>
      <div className="">
        <div className="line-clamps-3 mb-2 text-sm">{data.content}</div>
        <div
          className={cn("text-gray-400 text-xs", {
            "text-green-400": !data.is_readed,
          })}
        >
          {dayjs(data.created_at).fromNow()}
        </div>
        {!confirm.isAccept && (
          <div className="flex space-x-4 mt-3">
            <Button
              onClick={handleAcceptEvent}
              size="sm"
              className="text-white"
            >
              See Event
            </Button>
            <Button
              onClick={handleNotParticipate}
              size="sm"
              variant={"outline"}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventInviteNotification;
