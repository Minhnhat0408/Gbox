"use client";

import { useUser } from "@/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import { useEventDetail } from "@/hooks/useEventDetail";
import { toast } from "sonner";

const EventDiscussionZone = () => {
  const { userDetails } = useUser();

  const { isPariticpated, isHost } = useEventDetail();

  return (
    <div className="w-3/5 h-[400px]">
      <div className="card-container flex justify-between items-center rounded-2xl py-4 px-7">
        <Avatar className="w-[50px] h-[50px] mr-6">
          <AvatarImage
            className="object-cover object-center w-auto h-full"
            src={userDetails?.avatar || "/avatar.jpg"}
          />
          <AvatarFallback>{"A"}</AvatarFallback>
        </Avatar>
        <div className="flex justify-center flex-1">
          <Button
            onClick={() => {
              if (!isPariticpated && !isHost) {
                return toast.error(
                  "You must join the event to post a discussion"
                );
              }
            }}
            className="text-white w-full super-bg"
          >
            <AiOutlinePlus className="text-white text-xl mr-3" />
            Start discussion by posting a post
          </Button>
        </div>
      </div>
      <div className="text-xl font-bold mt-8 mb-6 super">
        Event recent activity
      </div>
      {!isPariticpated && !isHost && (
        <div className="w-full center rounded-2xl card-container">
          <span className="text-gray-400 text-lg">
            You must join the event to see the discussion zone
          </span>
        </div>
      )}
      {isPariticpated ||
        (isHost && <div className="rounded-2xl card-container h-24"></div>)}
    </div>
  );
};

export default EventDiscussionZone;
