"use client";

import axios from "axios";
import React, { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";

export default function Confirm({
  search,
  currentUserID,
  id,
}: {
  search: string;
  currentUserID: string;
  id: string;
}) {
  let [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  return (
    <button
      className="rounded-lg w-[170px] flex items-center justify-center h-10 text-[1rem] bg-[#3dbda7]"
      onMouseDown={async () => {
        setConfirmLoading(true);
        await axios.post(
          `/api/friends/acceptFriendReqs?id=${id}&receiverID=${currentUserID}`
        );
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
