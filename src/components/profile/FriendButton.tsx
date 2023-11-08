"use client";

import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiLoaderAlt } from "react-icons/bi";
import { FaUserCheck, FaUserPlus, FaUserClock } from "react-icons/fa6";
import { FaUserTimes } from "react-icons/fa";
import { ProfilesType } from "@/types/supabaseTableType";
import { useSearchUser, userSearchInput } from "@/hooks/useSearchUser";
import { Button } from "../ui/button";

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
            <Button
              className="text-white"
              onMouseDown={async () => {
                setAddFriendLoading(true);
                await axios.post(
                  `/api/friends/sendFriendReqs?id=${currentUser.userDetails?.id}&avatar=${currentUser.userDetails?.avatar}&username=${currentUser.userDetails?.name}&receiverID=${data.id}`
                );
                setFriendStt("waiting");
                setAddFriendLoading(false);
              }}
            >
              {addFriendLoading ? (
                <>
                  <BiLoaderAlt className="text-xl animate-spin mr-2" /> Add
                  Friend
                </>
              ) : (
                <>
                  <FaUserPlus className="mr-2 text-xl" />
                  Add Friend
                </>
              )}
            </Button>
          ) : null}

          {friendStt == "waiting" ? (
            <Button
              className="text-white"
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
                <>
                  <BiLoaderAlt className="text-xl animate-spin mr-2" /> Cancel
                  Request
                </>
              ) : (
                <>
                  <FaUserTimes className="mr-2 text-xl" />
                  Cancel Request
                </>
              )}
            </Button>
          ) : null}

          {friendStt == "accepting" ? (
            <div className="flex gap-x-3 items-center">
              <Button
                className="text-white"
                onMouseDown={async () => {
                  setConfirmLoading(true);
                  await axios.post(
                    `/api/friends/acceptFriendReqs?id=${data.id}&username=${data.name}&avatar=${data.avatar}&receiverID=${currentUser.userDetails?.id}&receiverName=${currentUser.userDetails?.name}&receiverAvatar=${currentUser.userDetails?.avatar}`
                  );
                  setFriendStt("friend");
                  setConfirmLoading(false);
                }}
              >
                {confirmLoading ? (
                  <>
                    <BiLoaderAlt className="text-xl animate-spin mr-2" />
                    Confirm
                  </>
                ) : (
                  <>
                    <FaUserClock className="mr-2 text-xl" />
                    Confirm
                  </>
                )}
              </Button>
              <Button
                variant={"outline"}
                onMouseDown={async () => {
                  setCancelRequestLoading(true);
                  await axios.post(
                    `/api/friends/cancelFriendReqs?receiverID=${currentUser.userDetails?.id}&id=${data.id}`
                  );
                  setFriendStt("unfriend");
                  setCancelRequestLoading(false);
                }}
              >
                {cancelRequestLoading ? (
                  <>
                    <BiLoaderAlt className="text-xl animate-spin mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <FaUserTimes className="mr-2 text-xl" />
                    Cancel
                  </>
                )}
              </Button>
            </div>
          ) : null}

          {friendStt == "friend" ? (
            <Button className="text-white">
              <FaUserCheck className="mr-2 text-xl" />
              Friend
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default FriendButton;
