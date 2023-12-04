"use client";

import { useRoomInvite } from "@/hooks/useRoomInvite";
import Modal from "../modals/Modal";
import { DialogHeader } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { ImSpinner8 } from "react-icons/im";
import RoomInviteButton from "./room-invite-button";
import RoomInviteItem from "./room-invite-item";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import { useUser } from "@/hooks/useUser";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { useSessionContext } from "@supabase/auth-helpers-react";

export default function RoomInviteModal() {
  const { isOpen, onClose, isLoading, users, removeUsers } = useRoomInvite();
  const { roomData, roomId } = useMatchingRoom((set) => set);
  const { userDetails } = useUser();
  const { supabaseClient } = useSessionContext();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[600px] !px-7 bg-layout py-7 !rounded-3xl gap-0"
    >
      <DialogHeader className="sm:text-center w-full px-9 mb-4 tracking-wider text-2xl font-bold text-center">
        Invite more friends to this room
      </DialogHeader>
      <Separator className="bg-primary w-full mb-4" />
      <div
        className={cn(
          "max-h-[calc(100vh-180px)] min-h-[300px] overflow-y-auto",
          {
            "center ": isLoading || users.length === 0,
          }
        )}
      >
        {isLoading ? (
          <ImSpinner8 className="text-4xl animate-spin" />
        ) : (
          <>
            {users.length === 0 ? (
              <div className="text-2xl text-center">
                Sorry we {"can't"} find user for you to invite 😭
              </div>
            ) : (
              <>
                {roomData?.host_id === userDetails?.id && (
                  <>
                    <RoomInviteItem user={"dummy"} />
                    <Separator className="bg-primary w-full mb-4" />
                  </>
                )}

                {users.map((user, index) => {
                  return <RoomInviteItem user={user} key={index} />;
                })}
              </>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}
