"use client";

import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import Modal from "../modals/Modal";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-select";
import { FaGamepad } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import MatchingRoomBody from "./matching-room-body";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { RoomData } from "@/types/supabaseTableType";
import { toast } from "sonner";

export default function MatchingRoomModal() {
  const { isOpen, onClose, roomId, setRoomId, roomData } = useMatchingRoom(
    (set) => set
  );
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const handleLeaveRoom = async () => {
    const { data, error } = await supabaseClient
      .from("room_users")
      .update({ outed_date: new Date() })
      .eq("user_id", user?.id)
      .eq("room_id", roomId);
    if (roomData && roomData.host_id === user?.id) {
      await supabaseClient
        .from("rooms")
        .update({
          state: "closed",
        })
        .eq("id", roomId);
      const { data: room_user, error } = await supabaseClient
        .from("room_users")
        .select("*")
        .eq("room_id", roomId)
        .is("outed_date", null)
        .neq("user_id", user?.id);
      if (room_user) {
        await Promise.all(
          room_user.map((room_user) => {
            return supabaseClient
              .from("room_users")
              .update({ outed_date: new Date() })
              .eq("user_id", room_user.user_id)
              ;
          })
        );
      }
    }
    if (error) {
      toast.error(error.message);
    }
    setRoomId(null);
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className={cn(
        "max-w-[80vw] p-0  justify-evenly flex  border-primary border-4  bg-transparent  !rounded-3xl remove-button"
      )}
    >
      <section className="flex flex-col p-4 m-2 bg-layout w-full rounded-2xl">
        <div className=" flex pb-4   w-full items-center">
          <h2 className="text-3xl  super font-bold tracking-wider">
            MinhMatMong&apos;s Room
          </h2>
          <div
            className={cn(
              "rounded-full font-bold h-fit py-1 items-center text-lg ml-4 bg-primary px-4 w-fit flex "
            )}
          >
            <div className="mr-2">
              <FaGamepad />
            </div>
            League of Legend
          </div>
          {/* <button onClick={() => {
            onClose();
          }} className="text-primary text-5xl ml-auto " >
         

          </button> */}
          {roomData?.host_id === user?.id ? (
            <AlertDialog>
              <AlertDialogTrigger className="text-primary text-5xl ml-auto hover:text-[#00d8f5] duration-500">
                <IoMdExit />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to leave the room
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Because you are room&apos;s owner so this room will be
                    deleted
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLeaveRoom}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <button className="text-primary text-5xl ml-auto hover:text-[#00d8f5] duration-500">
              <IoMdExit />
            </button>
          )}
        </div>

        {/* <Separator className="bg-primary h-[1px] w-full " /> */}
        <MatchingRoomBody />
        {/* <button
          onClick={() => {
            openChat();
          }}
          className="bg-psrimary text-white text-2xl font-bold w-full py-2 rounded-2xl mt-4"
        >
          Chat
        </button> */}
      </section>
    </Modal>
  );
}
