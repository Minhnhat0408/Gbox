import { GameProgress } from "@/types/gameProgressType";
import { AiFillPauseCircle, AiFillStar } from "react-icons/ai";
import { BsCheckCircleFill, BsFillStopCircleFill } from "react-icons/bs";
import { PiGameControllerFill } from "react-icons/pi";
import { TbAlignRight } from "react-icons/tb";

export default function convertGameStatus(status: GameProgress) {
  switch (status) {
    case "backlog":
      return (
        <div className=" rounded-xl center py-[5px] px-[10px] bg-violet-700">
          <span className="mr-2 text-sm ">Backlog</span>
          <AiFillStar />
        </div>
      );
      break;
    case "pause":
      return (
        <div className=" rounded-xl center py-[5px] px-[10px] bg-yellow-600">
          <span className="mr-2 text-sm">Paused</span>
          <AiFillPauseCircle />
        </div>
      );
      break;
    case "beat":
      return (
        <div className=" rounded-xl center py-[5px] px-[10px] bg-green-500">
          <span className="mr-2 text-sm">Finished</span>
          <BsCheckCircleFill />
        </div>
      );
      break;
    case "play":
      return (
        <div className=" rounded-xl center py-[5px] px-[10px] bg-blue-500">
          <span className="mr-2 text-sm">Playing</span>
          <PiGameControllerFill />
        </div>
      );
      break;
    case "wishlist":
      return (
        <div className=" rounded-xl center py-[5px] px-[10px] bg-zinc-500">
          <span className="mr-2 text-sm">Wishlist</span>
          <AiFillStar />
        </div>
      );
      break;
    case "quit":
      return (
        <div className=" rounded-xl center py-[5px] px-[10px] bg-rose-500">
          <span className="mr-2 text-sm">Quit</span>
          <BsFillStopCircleFill />
        </div>
      );
      break;
    default:
      break;
  }
}
