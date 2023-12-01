"use client";
import { Gamepad } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RoomInviteNotificationType } from "@/types/supabaseTableType";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "../ui/button";
import ProgressTimer from "../progress-timer";
import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import { useUser } from "@/hooks/useUser";
import LeaveRoomWarning from "./leave-room-warning";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";

dayjs.extend(relativeTime);
export default function RoomInviteNotification({
  data,
  toastId,
  short,
}: {
  data: RoomInviteNotificationType;
  short?: boolean;
  toastId?: any;
}) {
  const supabaseClient = createClientComponentClient();
  const { roomData, roomId, setRoomId, onOpen } = useMatchingRoom((set) => set);
  const router = useRouter();
  const handleJoinRoom = async () => {
    if (roomId && roomData?.host_id !== data.receiver_id) {
      await supabaseClient
        .from("room_users")
        .update({ outed_date: new Date() })
        .eq("user_id", data.receiver_id)
        .eq("room_id", roomId);
    }
    await supabaseClient.from("room_users").insert([
      {
        room_id: data.notification_meta_data.room_id,
        user_id: data.receiver_id,
        is_host: false,
      },
    ]);

    await supabaseClient
      .from("rooms")
      .update({
        current_people: data.notification_meta_data.current_people + 1,
      })
      .eq("id", data.notification_meta_data.room_id);
    setRoomId(data.notification_meta_data.room_id);
    toast.dismiss(toastId)
    onOpen();
  };

  return (
    <div
      onClick={async () => {
        if(!short) return
        if(data.is_readed) return
        await supabaseClient
          .from("notifications")
          .update({ is_readed: true })
          .eq("id", data.id);
      }}
      className={cn(
        "flex items-center  relative  cursor-pointer bg-home p-3 pr-9  hover:bg-black/30",
        short && " h-24 rounded-2xl bg-muted"
      )}
    >
      {!data.is_readed && short && (
        <div className="h-full absolute center top-0 bottom-0 right-3">
          <span className="w-3 h-3 rounded-full bg-green-400"></span>
        </div>
      )}

      {!short && (
        <ProgressTimer
          className="absolute -bottom-2 left-0 h-2 "
          initialTime={30}
        />
      )}
      <div className="relative center w-fit h-fit mr-5">
        <Avatar className="w-[60px] h-[60px]">
          <AvatarImage
            className="object-cover object-center w-auto h-full select-none"
            src={data.notification_meta_data.sender_avatar || "/avatar.jpg"}
          />
          <AvatarFallback>{"A"}</AvatarFallback>
        </Avatar>
        <div className="center rounded-full bg-[#3dbda7] h-7 w-7 absolute -bottom-1 -right-1 p-1">
          <Gamepad className=" text-white" />
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
      </div>
      {!short && (
        <div className="flex w-fit h-full gap-x-3">
          <Button variant={"outline"} onClick={() => {
            toast.dismiss(toastId)
          }}>Decline</Button>
          {roomData?.host_id === data.receiver_id ? (
            <LeaveRoomWarning
              className=" rounded-lg text-secondary px-4 bg-primary h-10  py-2  hover:bg-primary/90 font-bold"
              func={handleJoinRoom}
            >
              Accept
            </LeaveRoomWarning>
          ) : (
            <Button onClick={handleJoinRoom}>Accept</Button>
          )}
        </div>
      )}
    </div>
  );
}
