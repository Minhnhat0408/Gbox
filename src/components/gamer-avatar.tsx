"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function GamerAvatar() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative  flex justify-center">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/image 1.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="absolute top-0 z-10  bg-green-500 w-3 h-3 right-1  rounded-full"></div>
            <span className="absolute -bottom-2  bg-primary p-1 py-[2px] rounded-sm text-[8px]">
              In Game
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="p-4 bg-home">
          <div className="flex gap-x-2">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/image 1.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="gap-y-2">
              <p className="">MinhMatMong</p>
              <span className="text-muted-foreground italic">
                VN (Viet Nam)
              </span>
            </div>
          </div>
          <p className="super mt-3 font-bold">Playing Rocket League</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
