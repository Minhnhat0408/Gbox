"use client";

import { useState } from "react";
import { DateTimePicker } from "./DateTimePicker";
import { Button } from "../ui/button";
import { FiImage } from "react-icons/fi";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/hooks/useUser";
import { Label } from "../ui/label";

const EventFormBody = () => {
  const [date, setDate] = useState(new Date());

  const { userDetails } = useUser();

  return (
    <div className="space-y-3">
      <div
        className="w-full h-[200px] bg-black/50 relative rounded-md mb-3  bg-center bg-no-repeat bg-cover"
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
      <div className="flex items-center">
        <Avatar className="w-[50px] h-[50px] border-solid border-2 border-primary">
          <AvatarImage
            className="object-cover object-center w-auto h-full"
            src={userDetails?.avatar || "/avatar.jpg"}
          />
          <AvatarFallback>{userDetails?.name || "X"}</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-primary ml-2 font-bold">{userDetails?.name}</div>
          <div className="ml-2 text-sm text-gray-300">is hosted</div>
        </div>
      </div>
      <Input placeholder="Event name..." className="font-xl font-bold" />
      <div className="flex justify-between w-full">
        <div className="space-y-1">
          <div>Start date</div>
          <DateTimePicker date={date} setDate={setDate} />
        </div>
        <div className="space-y-1">
          <div>End date</div>
          <DateTimePicker date={date} setDate={setDate} />
        </div>
      </div>
    </div>
  );
};

export default EventFormBody;
