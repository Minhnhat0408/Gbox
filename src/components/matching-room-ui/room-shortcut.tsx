"use client";

import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import Timer from "../timer";
import { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { RoomData } from "@/types/supabaseTableType";
import { cn } from "@/lib/utils";

export default function RoomShortCut() {
  const { onOpen, roomData, roomId, setRoomData } = useMatchingRoom(
    (set) => set
  );
  const { supabaseClient } = useSessionContext();
  useEffect(() => {
    const channel = supabaseClient
      .channel(`room ${roomId} `)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
          filter: `id=eq.${roomId}`,
        },
        async (payload) => {
          setRoomData(payload.new as RoomData);
        }
      )

      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [roomId]);
  return (
    <button
      onClick={() => {
        onOpen();
      }}
      className={cn("fixed bottom-10 left-1/2 fancy -translate-x-1/2 py-3 px-6 bg-muted flex justify-center  rounded-full ",roomData?.matching_time && "bg-black/40 fancy-2")}
    >
      <span className={cn("font-bold z-10 tracking-wider  ", roomData?.matching_time ? "text-[#00d9f5]" : "super")}>
        {roomData?.matching_time ? (
          <Timer startTime={new Date(roomData.matching_time || "")} />
        ) : (
          "Return to room"
        )}
      </span>
      <span className="btn-hexagon absolute inset-0 border-primary"></span>
    </button>
  );
}
