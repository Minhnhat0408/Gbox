"use client";

import { BsFillChatDotsFill, BsThreeDots } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa6";
import { Button } from "../ui/button";
import JoinEventButton from "../event-control-button/JoinEventButton";

export default function EventControlZone() {
  return (
    <div className="w-full px-8 rounded-2xl card-container shine-2 mb-7">
      <div className="flex justify-between h-20 py-1">
        <div className="flex">
          <div className="flex justify-center hover:bg-black/20 rounded-lg relative h-full cursor-pointer w-[130px] items-center">
            <span className="text-center font-bold  super">Information</span>
            <span className="w-full rounded-t-lg absolute h-1 super-bg left-0 right-0 -bottom-[4px]"></span>
          </div>
          <div className="flex justify-center hover:bg-black/20 rounded-lg h-full relative cursor-pointer w-[130px] items-center">
            <span className="text-center font-bold">Discussion</span>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <Button size="sm" className="">
            <BsFillChatDotsFill className="text-xl text-white mr-2" />
            <span className="text-white">Event Chat</span>
          </Button>
          <JoinEventButton />
          <Button size="sm" className="">
            <FaEnvelope className="text-xl text-white mr-2" />
            <span className="text-white">Invite Friend</span>
          </Button>
          <Button size="sm" className="">
            <BsThreeDots className="text-xl text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
