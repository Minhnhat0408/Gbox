"use client";

import { FaEnvelope } from "react-icons/fa";
import { Button } from "../ui/button";
import { EventUser, useInviteFriendModal } from "@/hooks/useInviteFriendModal";
import InviteFriendModal from "../invite-friend-modal/InviteFriendModel";
import { useUser } from "@/hooks/useUser";
import { useEventDetail } from "@/hooks/useEventDetail";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { GameMetaData, ProfilesType } from "@/types/supabaseTableType";
import { useEventMemberModal } from "@/hooks/useEventMemberModal";
import { toast } from "sonner";

const InviteFriendButton = () => {
  const { onOpen, setIsLoading, setUsers } = useInviteFriendModal();

  const { supabaseClient } = useSessionContext();

  const { userDetails } = useUser();

  const { isHost, game_meta_data, user_id, start_date } = useEventDetail();

  const { members } = useEventMemberModal();

  const openInviteFriendModal = async () => {
    if (start_date) {
      const endDate = new Date(start_date);
      const currentDate = new Date();
      if (currentDate > endDate) {
        if (isHost)
          return toast.error(
            "Please adjust the start date to invite more friends to your event 😊"
          );
        return toast.error("Sorry, this event has ended 😞");
      }
    }
    onOpen();
    setIsLoading(true);
    // get another user that not host and not in the event_participations

    const getInviteUser = [
      supabaseClient.rpc("get_list_friends", {
        user_id: userDetails?.id,
      }),
    ];

    if (isHost) {
      getInviteUser.push(
        supabaseClient
          .from("profiles")
          .select("*")
          .neq("id", userDetails?.id)
          .limit(20)
      );
      getInviteUser.push(
        supabaseClient
          .from("user_game_data")
          .select("*, profiles(*)")
          .containedBy("game_meta_data", game_meta_data as GameMetaData)
      );
    }
    const userReturnData = await Promise.all(getInviteUser);

    if (userReturnData[1] && userReturnData[2]) {
      const friendArr = userReturnData[0].data as ProfilesType[];
      const anotherUserArr = userReturnData[1].data as ProfilesType[];
      const withSimilarGameArr = userReturnData[2].data as {
        profiles: ProfilesType;
      }[];

      const friendArrStatus = friendArr.map((friend) => {
        return {
          ...friend,
          type: "friend",
        };
      }) as EventUser[];

      const anotherUserArrStatus = anotherUserArr.map((user) => {
        return {
          ...user,
          type: "anotherUser",
        };
      }) as EventUser[];

      const withSimilarGameArrStatus = withSimilarGameArr.map((user) => {
        return {
          ...user.profiles,
          type: "withSimilarGame",
        };
      }) as EventUser[];

      // merge 2 array to remove duplicate
      const mergeArr = [
        ...friendArrStatus,
        ...withSimilarGameArrStatus,
        ...anotherUserArrStatus,
      ];
      // merge to remove duplicate , if there duplicate, keep the "type" with these order "friend" > "withSimilarGame" > "anotherUser"
      const uniqueArr = mergeArr.reduce((acc, current) => {
        const x = acc.find((item) => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          if (current.type === "friend") {
            x.type = "friend";
          } else if (current.type === "withSimilarGame") {
            if (x.type === "anotherUser") {
              x.type = "withSimilarGame";
            }
          }
          return acc;
        }
      }, [] as EventUser[]);
      // check array again and remove all element that in the event_participations and the id is not the host (userDetails?.id)
      const filterArr = uniqueArr.filter((user) => {
        const isUserInEvent = members.find(
          (event) => event.profiles.id === user.id
        );
        return !isUserInEvent && user.id !== userDetails?.id;
      });
      setUsers(filterArr);
    } else {
      const friendArrStatus = userReturnData[0].data.map(
        (friends: ProfilesType) => {
          return {
            ...friends,
            type: "friend",
          };
        }
      ) as EventUser[];
      // remove user that is host or already in the event
      const filterArr = friendArrStatus.filter((user) => {
        const isUserInEvent = members.find(
          (event) => event.profiles.id === user.id
        );
        return (
          !isUserInEvent && user.id !== userDetails?.id && user.id !== user_id
        );
      });
      console.log(filterArr);

      setUsers(filterArr);
    }
    setIsLoading(false);
  };

  return (
    <>
      <InviteFriendModal />
      <Button onClick={openInviteFriendModal} size="sm" className="">
        <FaEnvelope className="text-xl text-white mr-2" />
        <span className="text-white">Invite Friend</span>
      </Button>
    </>
  );
};

export default InviteFriendButton;
