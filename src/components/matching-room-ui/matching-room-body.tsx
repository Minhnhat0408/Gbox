"use client";
import { useUser } from "@/hooks/useUser";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { FaMicrophone, FaShieldHalved } from "react-icons/fa6";
import useFriendMessages from "@/hooks/useFriendMessages";
import MatchingProfile from "./matching-profile";
export default function MatchingRoomBody() {
  const { userDetails } = useUser();
  const { onOpen: openChat } = useFriendMessages((set) => set);

  return (
    <section className="w-full px-10 pt-8   flex flex-col  ">
      <div className="flex gap-x-8 py-4 justify-center">
        <MatchingProfile host profile/>
        <MatchingProfile profile host={false}/>

        <MatchingProfile profile={false} host={false}/>

      </div>
      <div className="flex w-full justify-between  mt-10">
        <div className="flex bg-primary gap-x-5 w-28 justify-center items-center rounded-full">
          <button onClick={() => {
            openChat();
          }} className="text-2xl ">
            <HiChatBubbleLeftRight />
          </button>
          <button className="text-2xl ">
            <FaMicrophone />
          </button>
        </div>
        <button className="btn-hexagon cyberpunk-button  h-full font-bold text-xl text-black  py-2 px-6">
          Start Matching
        </button>
        <div className="w-28 ">
          
        </div>
      </div>
    </section>
  );
}
