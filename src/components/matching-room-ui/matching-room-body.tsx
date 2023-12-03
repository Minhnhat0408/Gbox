"use client";
import { useUser } from "@/hooks/useUser";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { FaMicrophone, FaShieldHalved } from "react-icons/fa6";
import useFriendMessages from "@/hooks/useFriendMessages";
import MatchingProfile from "./matching-profile";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RoomData, RoomUserType } from "@/types/supabaseTableType";
import Timer from "../timer";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
export default function MatchingRoomBody() {
  const { userDetails } = useUser();
  const { onOpen: openChat } = useFriendMessages((set) => set);
  const { supabaseClient } = useSessionContext();
  const {
    roomId,
    setRoomData,
    roomData,
    setMembers,
    members,
    reload,
    changeReload,
  } = useMatchingRoom((set) => set);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      if (!roomId) {
        return;
      }
      setIsLoading(true);
      const { data, error } = await supabaseClient
        .from("rooms")
        .select("*")
        .eq("id", roomId)
        .single();
      if (error) {
        toast.error(error.message);
      }
      setRoomData(data);
      const { data: membersData, error: memberError } = await supabaseClient
        .from("room_users")
        .select("*, profiles(name, avatar)")
        .eq("room_id", roomId)
        .order("joined_date");
      if (memberError) {
        toast.error(memberError.message);
      }
      if (membersData) {
        const allMembers = [...membersData];
        for (var i = allMembers.length; i < data.total_people; i++) {
          if (i < data.current_people) {
            allMembers.push("dummy");
          } else {
            allMembers.push(null);
          }
          setMembers(allMembers);
        }
      }
      setIsLoading(false);
    })();
  }, [roomId, reload]);

  useEffect(() => {
    const channel = supabaseClient
      .channel(`room ${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "room_users",
          filter: `room_id=eq.${roomId}`,
        },
        async (payload) => {
          //push new member to members before the dummy
          const newMember = payload.new;
          if (!members || !roomData || !roomId) {
            return;
          }

          const { data, error } = await supabaseClient
            .from("profiles")
            .select("name, avatar")
            .eq("id", newMember.user_id)
            .single();
          newMember.profiles = data;
          const allMembers = [...members];

          const index = allMembers.findIndex((member) => member === "dummy");
          if (index === -1) {
            //find index of null
            const nullIndex = allMembers.findIndex((member) => member === null);
            allMembers[nullIndex] = newMember as RoomUserType;
            setMembers(allMembers);
            return;
          }

          allMembers.splice(index, 0, newMember as RoomUserType);
          setMembers(allMembers);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "room_users",
          filter: `room_id=eq.${roomId}`,
        },
        async (payload) => {
          const newMember = payload.old;
          if (!members || !roomData || !roomId) {
            return;
          }

          //remove member from members and push null at last
          const allMembers = [...members];
          const index = allMembers.findIndex((member) => {
            if (!member || member === "dummy") {
              return false;
            }
            return member.user_id === newMember.user_id;
          });
          allMembers.splice(index, 1);
          allMembers.push(null);
          setMembers(allMembers);
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [roomId, members, roomData]);

  useEffect(() => {
    const channel = supabaseClient
      .channel(`room`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
          filter: `id=eq.${roomId}`,
        },
        async (payload) => {
          const updatedRoom = payload.new;
          updatedRoom.profiles = roomData?.profiles;

          setRoomData(updatedRoom as RoomData);
          console.log(
            payload.new,
            "room update",
            payload.old,
            roomData?.total_people
          );
          if (
            roomData &&
            payload.new.state === "success" &&
            payload.new.current_people > roomData.current_people
          ) {
            console.log("hello");
            changeReload();
          }
        }
      )
      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [roomId, roomData]);

  const handleStartMatching = async () => {
    if (!roomId) {
      return;
    }
    const { data, error } = await supabaseClient
      .from("rooms")
      .update({ matching_time: new Date() })
      .eq("id", roomId);

    setTimeout(async () => {
      await supabaseClient
        .from("rooms")
        .update({ state: "matching" })
        .eq("id", roomId);
      if (error) {
        toast.error(error.message);
      }
    }, 5000);

    if (error) {
      toast.error(error.message);
    }
  };
  const handleEndMatching = async () => {
    if (!roomId) {
      return;
    }
    const { data, error } = await supabaseClient
      .from("rooms")
      .update({ state: "idle", matching_time: null })
      .eq("id", roomId);

    if (error) {
      toast.error(error.message);
    }
  };
  if (isLoading) {
    return (
      <div className="flex-1 h-full w-full flex justify-center items-center ">
        <div className="text-5xl text-primary animate-spin">
          <AiOutlineLoading3Quarters />
        </div>
      </div>
    );
  }

  return (
    <section className="w-full px-10 pt-8 h-full   flex flex-col  ">
      <div className="flex gap-x-8 py-4 justify-center">
    
        {members &&
          members.map((member, ind) => {
            return (
              <MatchingProfile
                key={ind}
                ind={ind}
                member={member}
                host={
                  (member &&
                    member !== "dummy" &&
                    roomData?.host_id === member.user_id) ||
                  false
                }
              />
            );
          })}
      </div>
      <div className="flex w-full mt-auto justify-between mb-4  ">
        <div className="flex bg-primary gap-x-5 w-28 justify-center items-center rounded-full">
          <button
            onClick={() => {
              openChat();
            }}
            className="text-2xl "
          >
            <HiChatBubbleLeftRight />
          </button>
          <button
            onClick={() => {
              console.log(process.env.NEXT_PUBLIC_SITE_URL)
              window.open(
                `${process.env.NEXT_PUBLIC_SITE_URL}/room?room=${roomId}&username=${userDetails?.name}`,
                "CallWindow",
                "width=1240,height=860"
              );
            }}
            className="text-2xl "
          >
            <FaMicrophone />
          </button>
        </div>
        {!roomData?.matching_time ? (
          <button
            onClick={() => {
              if (roomData?.host_id !== userDetails?.id) {
                return;
              }
              if (roomData?.current_people === roomData?.total_people) {
                toast.error("Room is already full ");
                return;
              }

              handleStartMatching();
            }}
            className={cn(
              "btn-hexagon   h-full font-bold text-xl bg-primary text-black  py-2 px-6",
              roomData?.host_id === userDetails?.id && "cyberpunk-button"
            )}
          >
            {roomData?.host_id !== userDetails?.id
              ? "Wait for Host"
              : "Start Matching"}
          </button>
        ) : (
          <div className="btn-hexagon bg-[#00d8f59f] flex   h-full font-bold text-xl text-white w-40  items-center py-2 px-6">
            <X
              className="mr-2 hover:cursor-pointer"
              onClick={handleEndMatching}
            />
            <Timer startTime={new Date(roomData?.matching_time || "")} />
          </div>
        )}

        <div className="w-28 "></div>
      </div>
    </section>
  );
}
