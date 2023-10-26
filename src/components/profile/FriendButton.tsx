"use client";

import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiLoaderAlt } from "react-icons/bi";
import { FaUserCheck, FaUserPlus } from "react-icons/fa6";
import { FaUserTimes } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";
import { ProfilesType } from "@/types/supabaseTableType";
import { useSearchUser, userSearchInput } from "@/hooks/useSearchUser";

const FriendButton = ({
  data,
  status,
}: {
  data: ProfilesType;
  status: string | null;
}) => {
  const currentUser = useUser();

  let [friendStt, setFriendStt] = useState(status);

  let [addFriendLoading, setAddFriendLoading] = useState<boolean>(false);
  let [cancelRequestLoading, setCancelRequestLoading] =
    useState<boolean>(false);
  let [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const { setSearchIp } = userSearchInput();

  useEffect(() => {
    setSearchIp("");
  }, []);

  return (
    <div className="flex justify-start w-full">
      {currentUser.userDetails?.name == data.name ? (
        <div className="h-10"></div>
      ) : (
        <div>
          {friendStt == "unfriend" ? (
            <button
              className="rounded-lg w-[170px] flex items-center justify-center h-10 text-[1rem] bg-[#3dbda7]"
              onMouseDown={async () => {
                setAddFriendLoading(true);
                await axios.post(
                  `/api/friends/sendFriendReqs?id=${currentUser.userDetails?.id}&receiverID=${data.id}`
                );
                setFriendStt("waiting");
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
          ) : null}

          {friendStt == "waiting" ? (
            <button
              className="rounded-lg w-[170px] flex items-center justify-center h-10 text-[1rem] bg-[#3dbda7]"
              onMouseDown={async () => {
                setCancelRequestLoading(true);
                await axios.post(
                  `/api/friends/cancelFriendReqs?id=${currentUser.userDetails?.id}&receiverID=${data.id}`
                );
                setFriendStt("unfriend");
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
          ) : null}

          {friendStt == "accepting" ? (
            <button
              className="rounded-lg w-[170px] flex items-center justify-center h-10 text-[1rem] bg-[#3dbda7]"
              onMouseDown={async () => {
                setConfirmLoading(true);
                await axios.post(
                  `/api/friends/acceptFriendReqs?id=${data.id}&receiverID=${currentUser.userDetails?.id}`
                );
                setFriendStt("friend");
                setConfirmLoading(false);
              }}
            >
              {confirmLoading ? (
                <BiLoaderAlt className="text-2xl animate-spin" />
              ) : (
                <div className="flex items-center">
                  <BsCheckLg className="mr-2 text-2xl mb-1" />
                  Confirm
                </div>
              )}
            </button>
          ) : null}

          {friendStt == "friend" ? (
            <button className="rounded-lg w-[170px] flex items-center justify-center h-10 text-[1rem] bg-[#3dbda7]">
              <div className="flex items-center">
                <FaUserCheck className="mr-2 text-xl mb-1" />
                Friend
              </div>
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default FriendButton;
