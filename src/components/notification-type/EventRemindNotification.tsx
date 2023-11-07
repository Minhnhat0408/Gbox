import { EventNotifyNotificationType } from "@/types/supabaseTableType";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Link from "next/link";
import { FaClock } from "react-icons/fa";

dayjs.extend(relativeTime);

const EventRemindNotification = ({
  data,
}: {
  data: EventNotifyNotificationType;
}) => {
  return (
    <Link
      href={`${data.link_to}`}
      className="flex items-center h-24 rounded-2xl cursor-pointer p-3 pr-4 hover:bg-black/30"
    >
      <div className="relative center w-fit h-fit mr-5">
        <Avatar className="w-[60px] h-[60px]">
          <AvatarImage
            className="object-cover object-center w-auto h-full select-none"
            src={data.notification_meta_data.sender_avatar || "/avatar.jpg"}
          />
          <AvatarFallback>{"A"}</AvatarFallback>
        </Avatar>
        <div className="center rounded-full bg-green-500 h-7 w-7 absolute -bottom-1 -right-1">
          <FaClock className="text-lg text-white" />
        </div>
      </div>
      <div className="">
        <div className="line-clamps-3 mb-2 text-sm">{data.content}</div>
        <div className="text-gray-400 text-xs">
          {dayjs(data.created_at).fromNow()}
        </div>
      </div>
    </Link>
  );
};

export default EventRemindNotification;
