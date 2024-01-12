"use client";

import { BsFillChatDotsFill, BsThreeDots } from "react-icons/bs";
import { Button } from "../ui/button";
import JoinEventButton from "../event-control-button/JoinEventButton";
import InviteFriendButton from "../event-control-button/InviteFriendButton";
import { useEventDetail } from "@/hooks/useEventDetail";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { useSupabase } from "@/hooks/useSupabaseClient";
import axios from "axios";

export default function EventControlZone() {
  const {
    setViewMode,
    viewMode,
    isPariticpated,
    profiles: event_owner,
    id,
  } = useEventDetail();
  const { userDetails } = useUser();

  const joinEventChat = async () => {
    if (!isPariticpated && userDetails?.id !== event_owner.id) {
      return toast.error("You must join this event to join the event chat 😢");
    }

    // add group user to event chat
    const res = await axios.post("/api/add-group-user", {
      group_id: id,
      user_name: userDetails?.name,
      user_id: userDetails?.id,
      role: "member",
    });

    if (res.data.error) {
      return toast.error("Failed to join event chat 😢");
    }
  };

  return (
    <div className="w-full px-8 rounded-2xl card-container shine-2 mb-7">
      <div className="flex justify-between h-20 py-1">
        <div className="flex">
          <div
            onClick={() => {
              if (viewMode === "detail") return;
              setViewMode("detail");
            }}
            className="flex justify-center hover:bg-black/20 rounded-lg relative h-full cursor-pointer w-[130px] items-center"
          >
            <span
              className={cn("text-center font-bold", {
                super: viewMode === "detail",
              })}
            >
              Information
            </span>
            {viewMode === "detail" && (
              <span className="w-full rounded-t-lg absolute h-1 super-bg left-0 right-0 -bottom-[4px]"></span>
            )}
          </div>
          <div
            onClick={() => {
              if (viewMode === "discussion") return;
              setViewMode("discussion");
            }}
            className="flex justify-center hover:bg-black/20 rounded-lg h-full relative cursor-pointer w-[130px] items-center"
          >
            <span
              className={cn("text-center font-bold", {
                super: viewMode === "discussion",
              })}
            >
              Discussion
            </span>
            {viewMode === "discussion" && (
              <span className="w-full rounded-t-lg absolute h-1 super-bg left-0 right-0 -bottom-[4px]"></span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <Button size="sm" className="" onClick={joinEventChat}>
            <BsFillChatDotsFill className="text-xl text-white mr-2" />
            <span className="text-white">Event Chat</span>
          </Button>
          <JoinEventButton />
          <InviteFriendButton />
          <Button size="sm" className="">
            <BsThreeDots className="text-xl text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
