"use client";

import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa6";
import { FriendStatusState } from "../search-page/UserFriendButton";
import { useUser } from "@/hooks/useUser";

export default function AddFriend({
  id,
  receiverName,
  setUserState,
}: {
  id: string;
  receiverName: string;
  setUserState: Dispatch<SetStateAction<FriendStatusState>>;
}) {
  let [addFriendLoading, setAddFriendLoading] = useState<boolean>(false);

  const { userDetails } = useUser();

  return (
    <button
      className="rounded-lg w-[170px] flex items-center justify-center h-10 text-[1rem] bg-[#3dbda7]"
      onMouseDown={async () => {
        if (addFriendLoading) return;
        setAddFriendLoading(true);
        await axios.post(
          `/api/friends/sendFriendReqs?id=${userDetails?.id}&username=${userDetails?.name}&avatar=${userDetails?.avatar}&receiverID=${id}`
        );
        setUserState("waiting");
        setAddFriendLoading(false);
      }}
    >
      {addFriendLoading ? (
        <BiLoaderAlt className="text-2xl animate-spin" />
      ) : (
        <div className="flex items-center">
          <FaUserPlus className="mr-2 text-xl mb-1" />
          Add Friend
        </div>
      )}
    </button>
  );
}
