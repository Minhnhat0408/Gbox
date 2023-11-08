import { EventNotifyNotificationType } from "@/types/supabaseTableType";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { FaUsers } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { cn } from "@/lib/utils";

dayjs.extend(relativeTime);

const NotificationChild = ({
  data,
  children,
}: {
  data: EventNotifyNotificationType;
  children?: React.ReactNode;
}) => {
  const router = useRouter();

  const { supabaseClient } = useSessionContext();

  return (
    <div
      onClick={async () => {
        await supabaseClient
          .from("notifications")
          .update({ is_readed: true })
          .eq("id", data.id);
        router.push(data.link_to!);
      }}
      className={cn(
        "flex items-center h-24 relative rounded-2xl cursor-pointer p-3 pr-9 hover:bg-black/30"
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
        {children}
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
      </div>
    </div>
  );
};

export default NotificationChild;
