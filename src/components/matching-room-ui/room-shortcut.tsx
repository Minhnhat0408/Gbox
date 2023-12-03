"use client";

import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import Timer from "../timer";

export default function RoomShortCut() {
  const { onOpen, roomData } = useMatchingRoom((set) => set);
  return (
    <button
      onClick={() => {
        onOpen();
  
      }}
      className="fixed bottom-10 left-1/2 fancy -translate-x-1/2 py-3 px-6 bg-muted flex justify-center  rounded-full "
    >
      <span className="font-bold z-10 tracking-wider super w-36 ">
        {roomData?.state === "matching" ? (
          <Timer startTime={new Date(roomData.matching_time || "")} />
        ) : (
          "Return to room"
        )}
      </span>
      <span className="btn-hexagon absolute inset-0 border-primary"></span>
    </button>
  );
}
