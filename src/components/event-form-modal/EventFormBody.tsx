"use client";

import { Button } from "../ui/button";
import { FiImage } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/hooks/useUser";
import { useEventFormBodyModal } from "@/hooks/useEventFormBody";
import PickTimeline from "./PickTimeLine";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { Textarea } from "../ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { BiBookAdd } from "react-icons/bi";
import EventMoreInformation from "./EventMoreInformation";

const EventFormBody = () => {
  const { userDetails } = useUser();

  const {} = useEventFormBodyModal();

  return (
    <div className="space-y-5 max-h-[calc(100vh-180px)] overflow-y-auto">
      <div
        className="w-full h-[200px] bg-black/50 relative mb-3  bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/wallpaper.jpg)`,
        }}
      >
        <Button
          className="bottom-5 right-5 hover:bg-gray-600/70 absolute text-white bg-gray-600"
          variant={"secondary"}
        >
          <FiImage className="w-4 h-4 mr-2" />
          Add Cover Photo
        </Button>
      </div>
      <div className="space-y-5 px-5">
        <div className="flex items-center">
          <Avatar className="w-[50px] h-[50px] border-solid border-2 border-primary">
            <AvatarImage
              className="object-cover object-center w-auto h-full"
              src={userDetails?.avatar || "/avatar.jpg"}
            />
            <AvatarFallback>{userDetails?.name || "X"}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-emerald-400 ml-2 font-bold">
              {userDetails?.name}
            </div>
            <div className="ml-2 text-sm text-gray-300">is hosted</div>
          </div>
        </div>
        <div className="rounded-lg flex items-center w-full bg-background px-4 py-2">
          <MdOutlineEmojiEvents className="mr-4 text-2xl text-gray-400" />
          <input
            className="focus-visible:outline-none font-bold placeholder:text-gray-400 bg-background w-full h-8 pr-4 text-base"
            placeholder="Event name..."
            onChange={(e) => {}}
          />
        </div>
        <div className="rounded-lg flex items-center w-full bg-background px-4 py-2">
          <IoGameControllerOutline className="mr-4 text-2xl text-gray-400" />
          <input
            className="focus-visible:outline-none placeholder:text-gray-400 bg-background w-full h-8 pr-4 text-base"
            placeholder="Game name..."
            onChange={(e) => {}}
          />
        </div>
        <PickTimeline />
        <Textarea
          placeholder="Event description..."
          className="rounded-lg !bg-background resize-none h-[210px] py-4 px-5 appearance-none focus:outline-none leading-[1.25] placeholder-white/20 text-neutral-100"
        />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem className="border-0" value="item-1">
            <AccordionTrigger className="flex w-full rounded-lg py-7 h-10 px-3 bg-black/20 hover:bg-black/40 transition">
              <div className="flex">
                <BiBookAdd className="mr-2 text-2xl text-gray-400" />
                <span className="text-base">Add more event information</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <EventMoreInformation />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default EventFormBody;
