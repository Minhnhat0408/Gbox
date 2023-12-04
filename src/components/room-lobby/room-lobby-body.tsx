"use client";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { RoomData } from "@/types/supabaseTableType";
import RoomItem from "./room-item";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import LoadingAnimation from "../loading-components/LoadingAnimation";

export default function RoomLobbyBody() {
  const { supabaseClient } = useSessionContext();
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { roomId } = useMatchingRoom((set) => set);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data, error } = await supabaseClient
        .from("rooms")
        .select("*, profiles(name,id,avatar,location)")
        .order("created_at");
      if (error) {
        toast.error(error.message);
      }
      if (data) {
        setRooms(data);
      }
      setIsLoading(false);
    })();
  }, []);
  return (
    <>
      {!isLoading ? (
        rooms.length > 0 ? (
          <div className="grid  xl:grid-cols-3 grid-cols-2 h-fit gap-10 mb-6 px-10 overflow-y-scroll scrollbar py-4">
            {rooms.map((room) => (
              <RoomItem key={room.id} {...room} />
            ))}
          </div>
        ) : (
          <div className="flex-1 h-full w-full flex justify-center items-center ">
            <h1 className="text-4xl text-primary font-bold tracking-wider ">No Rooms Available 😓</h1>
          </div>
        )
      ) : (
        <div className="flex-1 h-full w-full flex justify-center items-center ">
          <LoadingAnimation fill="hsl(var(--primary))" className="h-20 w-20"/>
        </div>
      )}
    </>
  );
}
