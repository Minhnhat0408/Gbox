"use client";

import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { FriendStatusState } from "../search-page/UserFriendButton";
import { useUser } from "@/hooks/useUser";

export default function Confirm({
  id,
  receiverName,
  receiverAvatar,
  setUserState,
}: {
  receiverName: string;
  receiverAvatar: string;
  id: string;
  setUserState: Dispatch<SetStateAction<FriendStatusState>>;
}) {
  let [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const { userDetails } = useUser();

  return (
    <button
      className="rounded-lg w-[170px] flex items-center justify-center h-10 text-[1rem] bg-[#3dbda7]"
      onMouseDown={async () => {
        if (confirmLoading) return;
        setConfirmLoading(true);
        await axios.post(
          `/api/friends/acceptFriendReqs?id=${id}&username=${receiverName}&avatar=${receiverAvatar}&receiverID=${userDetails?.id}&receiverName=${userDetails?.name}&receiverAvatar=${userDetails?.avatar}`
        );
        setUserState("friend");
        setConfirmLoading(false);
      }}
    >
      {confirmLoading ? (
        <BiLoaderAlt className="text-2xl animate-spin" />
      ) : (
        <div className="flex items-center">
          <BsCheckLg className="mr-1 text-2xl mb-[1px]" />
          Confirm
        </div>
      )}
    </button>
  );
}
