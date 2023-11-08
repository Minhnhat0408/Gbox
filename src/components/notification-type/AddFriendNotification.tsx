"use client";

import { AddFriendNotificationType } from "@/types/supabaseTableType";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";

dayjs.extend(relativeTime);

const EventInviteNotification = ({
  data,
}: {
  data: AddFriendNotificationType;
}) => {
  const router = useRouter();

  const { supabaseClient } = useSessionContext();

  const [confirm, setConfirm] = useState({
    isLoading: false,
    isUnAccepted: data.notification_meta_data.is_unaccepted || false,
  });

  const { userDetails } = useUser();

  const handleAcceptFriendReq = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setConfirm({
      isLoading: true,
      isUnAccepted: false,
    });
    await axios.post(
      `/api/friends/acceptFriendReqs?id=${data.sender_id}&username=${data.notification_meta_data.sender_name}&avatar=${data.notification_meta_data.sender_avatar}&receiverID=${userDetails?.id}&receiverName=${userDetails?.name}&receiverAvatar=${userDetails?.avatar}`
    );
    setConfirm({
      isLoading: false,
      isUnAccepted: false,
    });
  };

  const handleCancelReq = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setConfirm({
      isLoading: true,
      isUnAccepted: false,
    });

    const cancelReq = supabaseClient
      .from("sender_receivers")
      .delete()
      .eq("sender_id", data.sender_id)
      .eq("receiver_id", userDetails?.id);

    const updateNotification = supabaseClient
      .from("notifications")
      .update({
        notification_meta_data: {
          ...(data.notification_meta_data as any),
          is_unaccepted: true,
        },
        is_readed: true,
      })
      .eq("id", data.id);

    await Promise.all([cancelReq, updateNotification]);

    setConfirm({
      isLoading: false,
      isUnAccepted: true,
    });
  };

  return (
    <div
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        await supabaseClient
          .from("notifications")
          .update({ is_readed: true })
          .eq("id", data.id);
        router.push(data.link_to!);
      }}
      className={cn(
        "flex items-center relative rounded-2xl h-[140px] cursor-pointer p-3 pr-9 hover:bg-black/30",
        {
          "animate-pulse": confirm.isLoading,
          "h-24": confirm.isUnAccepted,
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
        <div className="center rounded-full bg-[#3dbda7] h-7 w-7 absolute -bottom-1 -right-1">
          <FaUserAlt className="text-lg text-white" />
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
        {!confirm.isUnAccepted && (
          <div className="flex space-x-4 mt-3">
            <Button
              onClick={handleAcceptFriendReq}
              size="sm"
              className="text-white"
            >
              Accept
            </Button>
            <Button onClick={handleCancelReq} size="sm" variant={"outline"}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventInviteNotification;
