"use client";

import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import Modal from "../modals/Modal";
import { cn } from "@/lib/utils";
import { FaGamepad } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";
import MatchingRoomBody from "./matching-room-body";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { RoomData } from "@/types/supabaseTableType";
import { toast } from "sonner";
import Image from "next/image";
import LeaveRoomWarning from "./leave-room-warning";
import { useEffect } from "react";

export default function MatchingRoomModal() {
  const {
    isOpen,
    onClose,
    roomId,
    setRoomId,
    roomData,
    setRoomData,
    changeReload,
  } = useMatchingRoom((set) => set);
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  useEffect(() => {
    (async () => {
      const { data, error } = await supabaseClient
        .from("room_users")
        .select("*")
        .eq("user_id", user?.id)
        .maybeSingle();

      if (data) {
        setRoomId(data.room_id);
        const { data: roomData } = await supabaseClient
          .from("rooms")
          .select("*")
          .eq("id", data.room_id)
          .single();
        setRoomData(roomData);
      } else {
        setRoomId(null);
      }
    })();
  }, []);
  useEffect(() => {
    const channel = supabaseClient
      .channel(`merge room`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "room_users",
          filter: `user_id=eq.${user?.id}`,
        },
        async (payload) => {
          console.log(payload.new, roomId, "mrege roome");
          if (roomId !== payload.new.room_id) {
            setRoomId(payload.new.room_id);
          }
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);
  const handleLeaveRoom = async () => {
    if (roomData?.matching_time) {
      toast.error("You can't leave the room while matching");
      return;
    }
    if (roomData) {
      const { data, error } = await supabaseClient
        .from("room_users")
        .delete()
        .eq("user_id", user?.id)
        .eq("room_id", roomId);
      await supabaseClient
        .from("rooms")
        .update({ current_people: roomData.current_people - 1 })
        .eq("id", roomId);
      if (error) {
        toast.error(error.message);
      }
      setRoomId(null);
      setRoomData(null);
      onClose();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className={cn(
        "max-w-[80vw] p-0   justify-evenly flex  border-primary border-4  bg-transparent  !rounded-3xl remove-button",
        roomData?.matching_time && "border-[#00d9f5]"
      )}
    >
      <section
        className={cn(
          "flex flex-col p-4 m-2 overflow-hidden  bg-layout w-full h-[90vh] rounded-2xl",
          roomData?.matching_time && "bg-matching wave"
        )}
      >
        {/* {roomData?.matching_time && (
          <Image
            src="/images/5WWU.gif"
            width={0}
            height={0}
            alt="ava"
            className="absolute top-0  left-0 w-full h-full"
          />
        )} */}
        <div className=" flex pb-4   w-full items-center z-[1]">
          <h2 className="text-3xl  super font-bold tracking-wider">
            {roomData?.name}
          </h2>
          <div
            className={cn(
              "rounded-full font-bold h-fit py-1 items-center text-lg ml-4 bg-primary px-4 w-fit flex "
            )}
          >
            <div className="mr-2">
              <FaGamepad />
            </div>
            {roomData?.game_name}
          </div>
          {/* <button onClick={() => {
            onClose();
          }} className="text-primary text-5xl ml-auto " >
         

          </button> */}
          {roomData?.host_id === user?.id ? (
            <LeaveRoomWarning
              userId={user?.id}
              className="text-primary text-5xl ml-auto hover:text-[#00d8f5] duration-500"
            >
              <IoMdExit />
            </LeaveRoomWarning>
          ) : (
            <button
              onClick={handleLeaveRoom}
              className="text-primary text-5xl ml-auto hover:text-[#00d8f5] duration-500"
            >
              <IoMdExit />
            </button>
          )}
        </div>
        <MatchingRoomBody />
      </section>
    </Modal>
  );
}
