"use client";

import { FaEnvelope } from "react-icons/fa";
import { Button } from "../ui/button";
import { EventUser, useInviteFriendModal } from "@/hooks/useInviteFriendModal";
import InviteFriendModal from "../invite-friend-modal/InviteFriendModel";
import { useUser } from "@/hooks/useUser";
import { useEventDetail } from "@/hooks/useEventDetail";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { GameMetaData, ProfilesType } from "@/types/supabaseTableType";
import { RoomUser, useRoomInvite } from "@/hooks/useRoomInvite";
import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import RoomInviteModal from "./room-invite-modal";
import { TfiPlus } from "react-icons/tfi";

const RoomInviteButton = () => {
  const { onOpen, setIsLoading, setUsers } = useRoomInvite((set) => set);

  const { supabaseClient } = useSessionContext();

  const { userDetails } = useUser();

  const { roomData } = useMatchingRoom();

  const { members } = useMatchingRoom();

  const openRoomInviteModal = async () => {
    if (!roomData || !members) return;
    onOpen();
    setIsLoading(true);
    // get another user that not host and not in the event_participations

    const getInviteUser = [
      supabaseClient.rpc("get_list_friends", {
        user_id: userDetails?.id,
      }),
      supabaseClient
        .from("user_game_data")
        .select("*, profiles(*)")
        .containedBy(
          "game_meta_data",
          roomData?.game_meta_data as GameMetaData
        ),
    ];

    const userReturnData = await Promise.all(getInviteUser);

    if (userReturnData[1]) {
      const friendArr = userReturnData[0].data as ProfilesType[];

      const withSimilarGameArr = userReturnData[1].data as {
        profiles: ProfilesType;
      }[];

      const friendArrStatus = friendArr.map((friend) => {
        return {
          ...friend,
          type: "friend",
        };
      }) as RoomUser[];

      const withSimilarGameArrStatus = withSimilarGameArr.map((user) => {
        return {
          ...user.profiles,
          type: "withSimilarGame",
        };
      }) as RoomUser[];

      // merge 2 array to remove duplicate
      const mergeArr = [...friendArrStatus, ...withSimilarGameArrStatus];
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
      }, [] as RoomUser[]);
      console.log(uniqueArr, members);
      // check array again and remove all element that in the event_participations and the id is not the host (userDetails?.id)
      const filterArr = uniqueArr.filter((user) => {
        const isUserInRoom = members.find((mem) => {
          if (!mem || mem === "dummy") return false;
          return mem.user_id === user.id;
        });
        return !isUserInRoom && user.id !== userDetails?.id;
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
      // remove user that is host or already in the room
      const filterArr = friendArrStatus.filter((user) => {
        const isUserInRoom = members.find((mem) => {
          if (!mem || mem === "dummy") return false;
          return mem.user_id === user.id;
        });
        return (
          !isUserInRoom &&
          user.id !== userDetails?.id &&
          user.id !== roomData.host_id
        );
      });

      setUsers(filterArr);
    }
    setIsLoading(false);
  };

  return (
    <button
      onClick={openRoomInviteModal}
      className="w-20 h-20 round-dashed text-3xl text-muted-foreground  flex justify-center items-center"
    >
      <TfiPlus />
    </button>
  );
};

export default RoomInviteButton;
