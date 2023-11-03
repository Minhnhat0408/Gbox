"use client";

import { EventInviteNotificationType } from "@/types/supabaseTableType";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BsFillEnvelopeCheckFill } from "react-icons/bs";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Button } from "../ui/button";

dayjs.extend(relativeTime);

const EventInviteNotification = ({
  data,
}: {
  data: EventInviteNotificationType;
}) => {
  return (
    <div className="flex items-center h-[140px] rounded-2xl cursor-pointer p-3 hover:bg-black/30">
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
      <div className="flex flex-col justify-center">
        <div className="line-clamps-3 mb-2 text-sm">{data.content}</div>
        <div className="text-gray-400 text-xs mb-3">
          {dayjs(data.created_at).fromNow()}
        </div>
        <div className="flex space-x-4">
          <Button size="sm" className="text-white">
            Join Event
          </Button>
          <Button size="sm" variant={"outline"}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventInviteNotification;
