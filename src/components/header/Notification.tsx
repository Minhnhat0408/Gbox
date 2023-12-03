"use client";

import { cn } from "@/lib/utils";
import { BiBell } from "react-icons/bi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { ImSpinner8 } from "react-icons/im";
import {
  AddFriendNotificationType,
  EventInviteNotificationType,
  EventNotifyNotificationType,
  NotificationsProps,
  RoomInviteNotificationType,
} from "@/types/supabaseTableType";
import EventInviteNotification from "../notification-type/EventInviteNotification";
import sound from "@/constants/sound";
// @ts-ignore
import useSound from "use-sound";
import NotificationChild from "../notification-type/NotificationChild";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaClock, FaUserAlt, FaUsers } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";
import AddFriendNotification from "../notification-type/AddFriendNotification";
import { Gamepad } from "lucide-react";
import { toast } from "sonner";
import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import RoomInviteNotification from "../room-invite/room-invite-notification";

function Notification({ className }: { className?: string }) {
  const { supabaseClient } = useSessionContext();

  const [unread, setUnread] = useState(0);

  const [notification, setNotification] = useState<NotificationsProps[]>([]);
  const { roomId, roomData } = useMatchingRoom((set) => set);
  const [loading, setLoading] = useState(false);

  const { userDetails } = useUser();

  const [play] = useSound(sound.notification);

  useEffect(() => {
    const fetchNotification = async () => {
      setLoading(true);
      const { data, error } = await supabaseClient
        .from("notifications")
        .select("*")
        .eq("receiver_id", userDetails?.id)
        .order("created_at", { ascending: false });

      if (error || !data) return;
      setNotification(data);
      setUnread((prev) => {
        return data.filter((notification) => !notification.is_readed).length;
      });
      setLoading(false);
    };
    if (!userDetails?.id) return;
    fetchNotification();
  }, [supabaseClient, userDetails?.id]);

  useEffect(() => {
    if (userDetails && userDetails?.id) {
      const channel = supabaseClient
        .channel("realtime_notifications_" + userDetails?.id)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "notifications",
            filter: `receiver_id=eq.${userDetails?.id}`,
          },
          async (payload) => {
            if (payload.eventType === "UPDATE") {
              play();
              if (payload.new.notification_type === "room_invite") {
                toast.custom(
                  (t) => (
                    <RoomInviteNotification
                      data={payload.new as RoomInviteNotificationType}
                      toastId={t}
                    />
                  ),
                  {
                    position: "bottom-left",
                    duration: 30000,
                    style: {
                      width: "450px",
                      padding: "0px",
                      zIndex: 9999,
                    },
                  }
                );
              }
              return setNotification((prev) => {
                const updateNotification = payload.new as NotificationsProps;
                console.log(updateNotification);
                console.log(prev);
                return prev.map((notif) =>
                  notif.id === updateNotification.id
                    ? updateNotification
                    : notif
                );
              });
            }
            if (payload.eventType === "INSERT") {
              play();
              setUnread((prev) => prev + 1);
              if (payload.new.notification_type === "room_invite") {
                toast.custom(
                  (t) => (
                    <RoomInviteNotification
                      data={payload.new as RoomInviteNotificationType}
                      toastId={t}
                    />
                  ),
                  {
                    position: "bottom-left",
                    duration: 30000,
                    style: {
                      width: "450px",
                      padding: "0px",
                      zIndex: 9999,
                    },
                  }
                );
              }
              return setNotification((prev) => {
                const newNotification = payload.new as NotificationsProps;
                return [newNotification, ...prev];
              });
            }
            if (payload.eventType === "DELETE") {
              if (unread > 0) {
                setUnread((prev) => prev - 1);
              }
              return setNotification((prev) => {
                const deleteNotification = payload.old as NotificationsProps;
                return prev.filter(
                  (notification) => notification.id !== deleteNotification.id
                );
              });
            }
          }
        )
        .subscribe();

      return () => {
        supabaseClient.removeChannel(channel);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails?.id]);

  return (
    <Popover
      onOpenChange={(open) => {
        if (open) {
          setUnread(0);
        }
      }}
    >
      <PopoverTrigger>
        <div
          className={cn(
            "text-3xl p-2 relative rounded-full cursor-pointer hover:bg-emerald-600",
            className
          )}
        >
          <BiBell />
          {unread > 0 && (
            <div className="absolute top-0 -right-1 rounded-full h-6 w-6 center bg-red-400">
              <span className="text-white text-sm font-bold">{unread}</span>
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        sticky="always"
        className="w-[360px] bg-muted py-4 px-1 h-[calc(100vh-150px)]"
      >
        <h1 className="super text-2xl inline-block px-4 font-bold mb-3">
          Notifications
        </h1>
        {loading ? (
          <div className="h-full center">
            <ImSpinner8 className="text-2xl animate-spin" />
          </div>
        ) : notification.length > 0 ? (
          <div className="h-[calc(100vh-234px)] overflow-y-auto">
            {notification.map((data, index) => {
              switch (data.notification_type) {
                case "event_invite":
                  return (
                    <EventInviteNotification
                      key={index}
                      data={data as EventInviteNotificationType}
                    />
                  );
                case "event_notify":
                  return (
                    <NotificationChild
                      key={index}
                      data={data as EventNotifyNotificationType}
                    >
                      <div className="center rounded-full bg-blue-600 h-7 w-7 absolute -bottom-1 -right-1">
                        <IoLogoGameControllerB className="text-lg text-white" />
                      </div>
                    </NotificationChild>
                  );
                case "event_remind":
                  return (
                    <NotificationChild
                      key={index}
                      data={data as EventNotifyNotificationType}
                    >
                      <div className="center rounded-full bg-green-500 h-7 w-7 absolute -bottom-1 -right-1">
                        <FaClock className="text-lg text-white" />
                      </div>
                    </NotificationChild>
                  );
                case "event_created":
                  return (
                    <NotificationChild
                      key={index}
                      data={data as EventNotifyNotificationType}
                    >
                      <div className="center rounded-full bg-orange-400 h-7 w-7 absolute -bottom-1 -right-1">
                        <FaUsers className="text-lg text-white" />
                      </div>
                    </NotificationChild>
                  );
                case "event_post_notify":
                  return (
                    <NotificationChild
                      key={index}
                      data={data as EventNotifyNotificationType}
                    >
                      <div className="center rounded-full bg-yellow-500 h-7 w-7 absolute -bottom-1 -right-1">
                        <BsLightningChargeFill className="text-base text-white" />
                      </div>
                    </NotificationChild>
                  );
                case "accepted_friend":
                  return (
                    <NotificationChild
                      key={index}
                      data={data as EventNotifyNotificationType}
                    >
                      <div className="center rounded-full bg-[#3dbda7] h-7 w-7 absolute -bottom-1 -right-1">
                        <FaUserAlt className="text-sm text-white" />
                      </div>
                    </NotificationChild>
                  );
                case "add_friend":
                  return (
                    <AddFriendNotification
                      key={index}
                      data={data as AddFriendNotificationType}
                    ></AddFriendNotification>
                  );
                case "room_invite":
                  return (
                    <RoomInviteNotification
                      key={index}
                      data={data as RoomInviteNotificationType}
                      short
                    />
                  );
                default:
                  return <div key={index}>{data.content}</div>;
              }
            })}
          </div>
        ) : (
          <div className="h-[calc(100vh-300px)] center overflow-y-auto">
            <h1 className="text-xl font-bold text-white">
              You have no notifications 😄
            </h1>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Notification;
