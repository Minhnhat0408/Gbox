"use client";

import { cn } from "@/lib/utils";
import { BiBell } from "react-icons/bi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { ImSpinner8 } from "react-icons/im";
import {
  EventInviteNotificationType,
  NotificationsProps,
} from "@/types/supabaseTableType";
import EventInviteNotification from "../notification-type/EventInviteNotification";

function Notification({ className }: { className?: string }) {
  const { supabaseClient } = useSessionContext();

  const [notification, setNotification] = useState<NotificationsProps[]>([]);

  const [loading, setLoading] = useState(false);

  const { userDetails } = useUser();

  useEffect(() => {
    const fetchNotification = async () => {
      setLoading(true);
      const { data, error } = await supabaseClient
        .from("notifications")
        .select("*")
        .eq("receiver_id", userDetails?.id)
        .order("created_at", { ascending: false });
      if (data) setNotification(data);
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
              return setNotification((prev) => {
                const updateNotification = payload.new as NotificationsProps;
                // remove the old notification and add the new one
                const newNotification = prev.filter(
                  (notification) => notification.id !== updateNotification.id
                );
                return [updateNotification, ...newNotification];
              });
            }
            if (payload.eventType === "INSERT") {
              return setNotification((prev) => {
                const newNotification = payload.new as NotificationsProps;
                return [newNotification, ...prev];
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
    <Popover>
      <PopoverTrigger>
        <div
          className={cn(
            "text-3xl p-2 rounded-full cursor-pointer hover:bg-muted",
            className
          )}
        >
          <BiBell />
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
          <div className="h-[calc(100vh-300px)] overflow-y-auto">
            {notification.map((data, index) => {
              switch (data.notification_type) {
                case "event_invite":
                  return (
                    <EventInviteNotification
                      key={index}
                      data={data as EventInviteNotificationType}
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
