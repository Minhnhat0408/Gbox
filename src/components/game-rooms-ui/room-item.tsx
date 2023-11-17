"use client";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaGamepad } from "react-icons/fa6";

export default function RoomItem() {
  return (
    <div className="rounded-2xl shine relative gap-y-4 flex flex-col h-[200px]  w-full p-4 z-10 ">
      <Image
        src={"/images/create.webp"}
        width={0}
        height={0}
        sizes="100vw"
        alt="ava"
        className={cn(
          "w-full h-full -z-[1] absolute brightness-50 top-0 left-0 rounded-2xl  object-cover "
        )}
      />
      <div className="flex h-full items-center justify-between">
        <div className="mr-3">
          <p className="z-10 super font-bold text-xl  line-clamp-2">
            MinhMatMong&apos; s Room 
          </p>
          <p className="rounded-full font-bold text-primary items-center  w-fit flex ">
            <div className="mr-2">
              <FaGamepad />
            </div>
            League of Legend
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={"/user/"}>
                <Avatar className="2xl:w-16 2xl:h-16 h-14 w-14 border-primary border-2">
                  <AvatarImage src={"/image 1.png"} />
                  <AvatarFallback className=" bg-gray-700">
                    Avatar
                  </AvatarFallback>
                </Avatar>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-home p-4">
              <div className="gap-x-2 flex">
                <Avatar className="w-12 h-12">
                  <Link href={"/user/"}>
                    <AvatarImage src={"/image 1.png"} />{" "}
                  </Link>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="gap-y-2">
                  <p className="">{"Noting"}</p>
                  <span className="text-muted-foreground italic">
                    {"fdsafsd `"}
                  </span>
                </div>
              </div>
              {/* <div className="flex mt-3 font-bold">{Object.values(profiles.gaming_platform).map((item,ind)  => {
                    return {
                      item.
                    }
                  })
                  </div> */}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mt-auto flex justify-between w-full">
        <div className="text-sm font-bold flex items-center">
          <div className="text-lg mr-2">
            <HiOutlineUserGroup />
          </div>
          <span className="text-xs">1/4</span>
        </div>
        <div className="border-2 px-2 border-primary rounded-lg text-primary">
          Matching
        </div>
      </div>
    </div>
  );
}
