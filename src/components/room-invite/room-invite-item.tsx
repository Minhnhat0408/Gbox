"use client";

import { useEventDetail } from "@/hooks/useEventDetail";
import { useUser } from "@/hooks/useUser";
import { ProfilesType } from "@/types/supabaseTableType";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { ImSpinner8 } from "react-icons/im";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { convertUserStatus } from "@/lib/convertUserStatus";
import { RoomUser } from "@/hooks/useRoomInvite";
import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import Timer from "../timer";

export default function RoomInviteItem({ user }: { user: RoomUser | "dummy" }) {
  const [inviteState, setInviteState] = useState({
    loading: false,
    invited: false,
  });

  const { roomData, roomId } = useMatchingRoom();

  const { supabaseClient } = useSessionContext();

  const { userDetails } = useUser();

  const inviteUser = async (userID: string) => {
    if (user === "dummy") return;
    setInviteState({ loading: true, invited: false });
    const { data, error } = await supabaseClient.from("notifications").upsert({
      id: `${userDetails?.id}-${userID}-${roomId}-room_invite`,
      created_at: new Date(),
      content: `${userDetails?.name} invited you to play ${roomData?.game_name}`,
      sender_id: userDetails?.id,
      receiver_id: userID,
      notification_type: "room_invite",
      room_id: roomId,
      notification_meta_data: {
        room_id: roomId,
        current_people: roomData?.current_people,
        sender_avatar: userDetails?.avatar,
        sender_name: userDetails?.name,
      },
    });
    if (error) {
      toast.error(error.message);
      return setInviteState({ loading: false, invited: false });
    } else {
      toast.success(`Invited ${user.name} success`);
      setInviteState({ loading: false, invited: true });
    }
  };
  if (user === "dummy") {
    return (
      <div className="h-24 transition flex justify-between items-center rounded-xl w-full p-4 ">
        <div className="flex items-center space-x-4 ml-2">
          <Avatar className="w-[50px] h-[50px] mr-3">
            <AvatarImage
              className="object-cover object-center w-auto h-full"
              src={"/images/login-bg.png"}
            />
            <AvatarFallback>{"A"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <div className="super font-bold text-xl mb-[6px]">
              {"Gbox's Dummy "}
            </div>
            <p className="text-sm text-gray-400">
              Dummy represent for absent user in the room
            </p>
          </div>
        </div>

        <Button
          size={"sm"}
          disabled={
            inviteState.loading ||
            roomData?.current_people === roomData?.total_people
          }
          className="text-white"
          onClick={async () => {
            if (inviteState.loading) return;
            if (!inviteState.invited) {
              if (
                !roomData ||
                roomData?.current_people === roomData?.total_people
              ) {
                return;
              }
              setInviteState({ loading: true, invited: false });
              await supabaseClient
                .from("rooms")
                .update({ current_people: roomData?.current_people + 1 })
                .eq("id", roomId);
              setInviteState({ loading: false, invited: false });
            }
            // if (inviteState.invited) return await removeInvite(user.id);
          }}
        >
          {inviteState.invited ? (
            <span className="text-white">Cancel</span>
          ) : (
            <span className="text-white">Invite</span>
          )}
          {inviteState.loading ? (
            <ImSpinner8 className="ml-2 animate-spin"></ImSpinner8>
          ) : (
            <BsFillEnvelopeFill className="ml-2" />
          )}
        </Button>
      </div>
    );
  }
  return (
    <div className="h-24 transition flex justify-between items-center rounded-xl w-full p-4 ">
      <div className="flex items-center space-x-4 ml-2">
        <Avatar className="w-[50px] h-[50px] mr-3">
          <AvatarImage
            className="object-cover object-center w-auto h-full"
            src={user.avatar || "/avatar.jpg"}
          />
          <AvatarFallback>{"A"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <Link
            href={`/user/${user.name}`}
            className="super font-bold text-xl mb-[6px]"
          >
            {user.name}
          </Link>
          <p className="text-sm text-gray-400">
            {convertUserStatus(user.type, roomData!.game_name)}
          </p>
        </div>
      </div>

      <Button
        size={"sm"}
        disabled={inviteState.loading || inviteState.invited}
        className="text-white"
        onClick={async () => {
          if (inviteState.loading) return;
          if (!inviteState.invited) return await inviteUser(user.id);
          // if (inviteState.invited) return await removeInvite(user.id);
        }}
      >
        {inviteState.invited ? (
          <Timer
            initialTime={30}
            mode="timer"
            func={() => {
              setInviteState({ loading: false, invited: false });
            }}
          />
        ) : (
          <span className="text-white">Invite</span>
        )}
        {inviteState.loading || inviteState.invited ? (
          <ImSpinner8 className="ml-2 animate-spin"></ImSpinner8>
        ) : (
          <BsFillEnvelopeFill className="ml-2" />
        )}
      </Button>
    </div>
  );
}
