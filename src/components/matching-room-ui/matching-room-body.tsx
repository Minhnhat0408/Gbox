"use client";
import { useUser } from "@/hooks/useUser";
import { FaMicrophone, FaShieldHalved } from "react-icons/fa6";
import useFriendMessages from "@/hooks/useFriendMessages";
import MatchingProfile from "./matching-profile";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import { toast } from "sonner";
import useAudio from "@/hooks/useAudio";
import sound from "@/constants/sound";
import useThrottle from "@/hooks/useThrottle";
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "../ui/tooltip";
import Timer from "../timer";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import LoadingAnimation from "../loading-components/LoadingAnimation";
import Slider from "../animations/slider";
import { RoomUserType } from "@/types/supabaseTableType";
import { useDisplayCongratulations } from "@/hooks/useDisplayCongratulations";
import { useSoundControl } from "@/hooks/useSoundControl";
import { set } from "date-fns";
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
    setRoomId,
    onClose,
    changeReload,
  } = useMatchingRoom((set) => set);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const { onOpen: openCongrats } = useDisplayCongratulations((set) => set);
  const [userInd, setUserInd] = useState(0);
  const { controlGameMatching, gameMatchingState, setGameMatchingState } =
    useSoundControl((set) => set);
  const roomNotif = useAudio(sound.roomNoti, {
    volume: 0.2,
  });

  const playRoomNotif = useThrottle(() => {
    roomNotif.play();
  }, 2000);
  const congratulation = useAudio(sound.matchFound);
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

      if (data.state === "success") {
        congratulation.play();
        openCongrats();
        controlGameMatching("stop");
        setGameMatchingState("stop");
        await supabaseClient
          .from("rooms")
          .update({ state: "idle" })
          .eq("id", roomId);
      }
      if (data.state === "matching") {
        if (gameMatchingState !== "play") {
          controlGameMatching("play");
          setGameMatchingState("play");
        }
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

        const userIndex = allMembers.findIndex(
          (member) => member.user_id === userDetails?.id
        );
        setUserInd(userIndex);
        for (var i = allMembers.length; i < data.total_people; i++) {
          if (i < data.current_people) {
            allMembers.push("dummy");
          } else {
            allMembers.push(null);
          }
        }
        setMembers(allMembers);
      }
      setIsLoading(false);
      setInitialLoad(false);
    })();
  }, [roomId, reload]);

  useEffect(() => {
    const channel = supabaseClient
      .channel(`room ${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "room_users",
          filter: `room_id=eq.${roomId}`,
        },
        async (payload) => {
          //push new member to members before the dummy
          if (payload.old.room_id !== roomId) {
            return;
          }
          if (payload.old.user_id === userDetails?.id) {
            setRoomId(null);
            setRoomData(null);
            onClose();
            toast.error("You are out of the room");
          } else {
            //check if members has this old user
            const { data, error } = await supabaseClient
              .from("profiles")
              .select("name")
              .eq("id", payload.old.user_id)
              .single();
            if (data) {
              playRoomNotif();
              toast.error(`${data.name} left the room`);
            }
          }
        }
      )
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
          if (payload.new.room_id !== roomId) {
            return;
          }
          if (payload.new.user_id) {
            if (payload.new.user_id !== userDetails?.id) {
              const { data, error } = await supabaseClient
                .from("profiles")
                .select("name")
                .eq("id", payload.new.user_id)
                .single();
              if (data) {
                playRoomNotif();
                toast.success(`${data.name} joined the room`);
              }
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [roomId]);

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
          if (payload.new.id !== roomId) {
            return;
          }
          changeReload();
        }
      )

      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [roomId]);

  const handleStartMatching = async () => {
    if (!roomId) {
      return;
    }
    controlGameMatching("play");
    setGameMatchingState("play");
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
    controlGameMatching("stop");
    setGameMatchingState("stop");
    const { data, error } = await supabaseClient
      .from("rooms")
      .update({ state: "idle", matching_time: null })
      .eq("id", roomId);

    if (error) {
      toast.error(error.message);
    }
  };
  if (initialLoad) {
    return (
      <div className="flex-1 h-full w-full flex justify-center items-center ">
        <LoadingAnimation fill="hsl(var(--primary))" className="w-20 h-20" />
      </div>
    );
  }

  return (
    <section className="w-full px-10 2xl:pt-8 xl:pt-2 h-full   flex flex-col  ">
      {members &&
        (members?.length > 5 ? (
          <Slider
            perView={5}
            spacing={12}
            arrowLarge
            initial={Math.floor(userInd / 5)}
            arrow={true}
            className=" py-4 w-full px-2"
          >
            {members.map((member, ind) => {
              return (
                <div
                  key={ind}
                  className="keen-slider__slide flex justify-center"
                >
                  <MatchingProfile
                    ind={ind}
                    member={member}
                    host={
                      (member &&
                        member !== "dummy" &&
                        roomData?.host_id === member.user_id) ||
                      false
                    }
                  />
                </div>
              );
            })}
          </Slider>
        ) : (
          <div className="py-4 flex justify-center w-full gap-x-10 ">
            {members.map((member, ind) => {
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
        ))}
      <div className="flex w-full mt-auto justify-between mb-4  ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={() => {
                  window.open(
                    `${process.env.NEXT_PUBLIC_SITE_URL}/room?room=${roomId}&userId=${userDetails?.id}`,
                    "CallWindow",
                    "width=1240,height=860"
                  );
                }}
                className={cn(
                  "flex bg-primary gap-x-2 hover:cursor-pointer w-32 justify-center text-xl font-bold  items-center rounded-full",
                  roomData?.matching_time && "bg-[#00d8f59f]"
                )}
              >
                <div className="text-2xl">
                  <FaMicrophone />
                </div>
                Voice
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className=" p-4 w-[200px]">
              Join the channel to talk and chat with other people in the room
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

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

        <div className="w-32 "></div>
      </div>
    </section>
  );
}
