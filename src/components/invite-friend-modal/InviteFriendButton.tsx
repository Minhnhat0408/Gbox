"use client";

import { EventUser } from "@/hooks/useInviteFriendModal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useEventDetail } from "@/hooks/useEventDetail";
import { convertUserStatus } from "@/lib/convertUserStatus";
import { Button } from "../ui/button";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { toast } from "sonner";
import { ImSpinner8 } from "react-icons/im";

const InviteFriendButton = ({ user }: { user: EventUser }) => {
  const [inviteState, setInviteState] = useState({
    loading: false,
    invited: false,
  });

  const { game_name, id, event_name } = useEventDetail();

  const { supabaseClient } = useSessionContext();

  const { userDetails } = useUser();

  const removeInvite = async (userID: string) => {
    setInviteState({ loading: true, invited: false });
    const { data, error } = await supabaseClient
      .from("notifications")
      .delete()
      .eq("id", `${userDetails?.id}-${userID}-event_invite`);
    if (error) {
      toast.error(error.message);
      return setInviteState({ loading: false, invited: true });
    } else {
      setInviteState({ loading: false, invited: false });
    }
  };

  const inviteUser = async (userID: string) => {
    setInviteState({ loading: true, invited: false });
    const { data, error } = await supabaseClient.from("notifications").upsert({
      id: `${userDetails?.id}-${userID}-${id}-event_invite`,
      created_at: new Date(),
      content: `${userDetails?.name} invited you to join "${event_name}" event`,
      sender_id: userDetails?.id,
      receiver_id: userID,
      link_to: `/event/${id}`,
      notification_type: "event_invite",
      notification_meta_data: {
        event_id: id,
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
            {convertUserStatus(user.type, game_name)}
          </p>
        </div>
      </div>
      <Button
        size={"sm"}
        disabled={inviteState.loading}
        className="text-white"
        onClick={async () => {
          if (inviteState.loading) return;
          if (!inviteState.invited) return await inviteUser(user.id);
          if (inviteState.invited) return await removeInvite(user.id);
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
};

export default InviteFriendButton;
