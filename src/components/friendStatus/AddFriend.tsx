"use client";

import axios from "axios";
import React, { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa6";

export default function AddFriend({
  search,
  currentUserID,
  id,
}: {
  search: string;
  currentUserID: string;
  id: string;
}) {
  let [addFriendLoading, setAddFriendLoading] = useState<boolean>(false);

  return (
    <button
      className="rounded-lg w-[170px] flex items-center justify-center h-10 text-[1rem] bg-[#3dbda7]"
      onMouseDown={async () => {
        setAddFriendLoading(true);
        await axios.post(
          `/api/friends/sendFriendReqs?id=${currentUserID}&receiverID=${id}`
        );
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
