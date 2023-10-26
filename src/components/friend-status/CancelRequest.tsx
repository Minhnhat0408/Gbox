"use client";

import { useSearchUser } from "@/hooks/useSearchUser";
import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { FaUserTimes } from "react-icons/fa";
import { FriendStatusState } from "../search-page/UserFriendButton";

export default function CancelRequest({
  search,
  currentUserID,
  id,
  setUserState,
}: {
  search: string;
  currentUserID: string;
  id: string;
  setUserState: Dispatch<SetStateAction<FriendStatusState>>;
}) {
  let [cancelRequestLoading, setCancelRequestLoading] =
    useState<boolean>(false);

  return (
    <button
      className="rounded-lg w-[170px] flex items-center justify-center h-10 text-[1rem] bg-[#3dbda7]"
      onClick={async () => {
        if (cancelRequestLoading) return;
        setCancelRequestLoading(true);
        await axios.post(
          `/api/friends/cancelFriendReqs?id=${currentUserID}&receiverID=${id}`
        );
        setUserState("unfriend");
        setCancelRequestLoading(false);
      }}
    >
      {cancelRequestLoading ? (
        <BiLoaderAlt className="text-2xl animate-spin" />
      ) : (
        <div className="flex items-center">
          <FaUserTimes className="mr-2 text-xl mb-1" />
          Cancel Request
        </div>
      )}
    </button>
  );
}
