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
import { RoomData } from "@/types/supabaseTableType";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function MatchingRoomBody() {
  const { userDetails } = useUser();
  const { onOpen: openChat } = useFriendMessages((set) => set);
  const { supabaseClient } = useSessionContext();
  const { roomId, setRoomData, roomData, setMembers, members } =
    useMatchingRoom((set) => set);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data, error } = await supabaseClient
        .from("rooms")
        .select("*")
        .eq("id", roomId)
        .single();
      if (error) {
        toast.error(error.message);
      }
      if (data) {
        setRoomData(data);
      }
      const { data: membersData, error: memberError } = await supabaseClient
        .from("room_users")
        .select("*, profiles(name, avatar)")
        .eq("room_id", roomId)
        .is("outed_date", null)
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
  }, []);
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
        {/* <MatchingProfile host profile/>
        <MatchingProfile profile host={false}/>

        <MatchingProfile profile={false} host={false}/> */}
        {members &&
          members.map((member, ind) => {
            return (
              <MatchingProfile
                key={ind}
                member={member}
                host={(member && member !== "dummy" && member.is_host) || false}
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
          <button className="text-2xl ">
            <FaMicrophone />
          </button>
        </div>
        <button className="btn-hexagon cyberpunk-button  h-full font-bold text-xl text-black  py-2 px-6">
          Start Matching
        </button>
        <div className="w-28 "></div>
      </div>
    </section>
  );
}
