import { cn } from "@/lib/utils";
import { GameProgressType } from "@/types/gameProgressType";
import { AiFillPauseCircle, AiFillStar } from "react-icons/ai";
import { BsCheckCircleFill, BsFillStopCircleFill } from "react-icons/bs";
import { PiGameControllerFill } from "react-icons/pi";
import { TbAlignRight } from "react-icons/tb";

export const gameProgressArray = [
  "wishlist",
  "backlog",
  "play",
  "pause",
  "beat",
  "quit",
];

const gameProgress: GameProgressType = {
  wishlist: {
    label: "i want this",
    icon: (className: string, classNameParents?: string) => {
      return (
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 bg-white rounded-lg",
            classNameParents
          )}
        >
          <AiFillStar className={cn(className) + " text-gray-600"} />
        </div>
      );
    },
  },
  backlog: {
    label: "planned to play",
    icon: (className: string, classNameParents?: string) => {
      return (
        <div
          className={cn(
            "bg-violet-700 flex items-center justify-center w-8 h-8 rounded-lg",
            classNameParents
          )}
        >
          <TbAlignRight className={cn(className)} />
        </div>
      );
    },
  },
  play: {
    label: "started or active",
    icon: (className: string, classNameParents?: string) => {
      return (
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 bg-blue-500 rounded-lg",
            classNameParents
          )}
        >
          <PiGameControllerFill className={cn(className)} />
        </div>
      );
    },
  },
  pause: {
    label: "taking a break",
    icon: (className: string, classNameParents?: string) => {
      return (
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 bg-yellow-600 rounded-lg",
            classNameParents
          )}
        >
          <AiFillPauseCircle className={cn(className)} />
        </div>
      );
    },
  },
  beat: {
    label: "i completed it",
    icon: (className: string, classNameParents?: string) => {
      return (
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 bg-green-500 rounded-lg",
            classNameParents
          )}
        >
          <BsCheckCircleFill className={cn(className)} />
        </div>
      );
    },
  },
  quit: {
    label: "i won't return",
    icon: (className: string, classNameParents?: string) => {
      return (
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 bg-red-500 rounded-lg",
            classNameParents
          )}
        >
          <BsFillStopCircleFill className={cn(className)} />
        </div>
      );
    },
  },
};

export default gameProgress;
