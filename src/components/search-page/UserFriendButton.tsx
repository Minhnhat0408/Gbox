"use client";

import AddFriend from "@/components/friend-status/AddFriend";
import CancelRequest from "@/components/friend-status/CancelRequest";
import Confirm from "@/components/friend-status/Confirm";
import { ProfilesType } from "@/types/supabaseTableType";
import { useState } from "react";
import { FaUserCheck } from "react-icons/fa6";

type UserFriendButtonProps = {
  user: any;
  userDetails: ProfilesType | null;
  search: string | null;
};

export type FriendStatusState =
  | "unfriend"
  | "waiting"
  | "accepting"
  | "friend"
  | null;

const UserFriendButton = ({
  user,
  userDetails,
  search,
}: UserFriendButtonProps) => {
  const [userState, setUserState] = useState<FriendStatusState>(
    user.friend_request_status
  );

  return (
    <div>
      {userState == "unfriend" ? (
        <AddFriend
          receiverName={user.name}
          id={user.id}
          setUserState={setUserState}
        />
      ) : null}

      {userState == "waiting" ? (
        <CancelRequest
          receiverName={user.name}
          id={user.id}
          setUserState={setUserState}
        />
      ) : null}

      {userState == "accepting" ? (
        <Confirm
          receiverName={user.name}
          id={user.id}
          setUserState={setUserState}
        />
      ) : null}

      {userState == "friend" ? (
        <button className="rounded-lg w-[170px] flex items-center justify-center h-10 text-[1rem] bg-[#3dbda7]">
          <div className="flex items-center">
            <FaUserCheck className="mr-2 text-xl mb-1" />
            Friend
          </div>
        </button>
      ) : null}
    </div>
  );
};

export default UserFriendButton;
