"use client";

import useGameRooms from "@/hooks/useGameRooms";
import Modal from "../modals/Modal";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CgChevronDoubleLeft } from "react-icons/cg";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiSwordFill } from "react-icons/ri";
export default function GameRoomsModal() {
  const { isOpen, onClose } = useGameRooms((set) => set);
  const [mode, setMode] = useState<"join" | "create" | undefined>();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className={cn(
        "max-w-[80vw]   h-[90vh]   py-6 pb-5 justify-center flex bg-transparent  !rounded-3xl remove-button",
        mode && "bg-layout"
      )}
    >
      {!mode ? (
        <>
          <div
            onClick={() => setMode("join")}
            className=" box-border cursor-pointer relative group  rounded-3xl p-2 hover:border-primary duration-500 border-[#1c5349] overflow-hidden border-4 mr-20 h-full w-[40%]"
          >
            <Image
              src="https://ejaw.net/wp-content/uploads/2023/09/kozipysk_a_lone_adventurer_glad_in_a_hood_and_glowing_garments__a0d343f0-4e8c-400a-9771-0d78f17fc140.png"
              sizes="100vw"
              width="0"
              height="0"
              alt="mode"
              className="h-full brightness-50 w-auto object-cover group-hover:brightness-100 duration-500 rounded-2xl"
            />
            <div className="absolute bottom-2 h-0 duration-500 left-2 right-2 rounded-2xl  group-hover:h-[90%] glow-vertical "></div>
            <div className="absolute group-hover:opacity-100 flex flex-col items-center opacity-0 duration-500  top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 ">
              <div className=" text-white whitespace-nowrap  2xl:text-5xl text-4xl tracking-wider font-bold">
                Join Room
              </div>
              <div className="text-white text-[80px] mt-10 ">
                <HiOutlineUserGroup />
              </div>
            </div>
          </div>
          <div
            onClick={() => setMode("create")}
            className=" box-border cursor-pointer group relative overflow-hidden hover:border-primary duration-500 border-[#1c5349]  rounded-3xl p-2  border-4 h-full w-[40%]"
          >
            <Image
              src="/images/create.webp"
              sizes="100vw"
              width="0"
              height="0"
              alt="mode"
              className="h-full brightness-50 w-auto object-cover group-hover:brightness-100 duration-500 rounded-2xl"
            />
            <div className="absolute bottom-2 h-0 duration-500 left-2 right-2 rounded-2xl  group-hover:h-[90%] glow-vertical "></div>
            <div className="absolute flex flex-col items-center group-hover:opacity-100 w-fit  opacity-0 duration-500  top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 ">
              <div className=" text-white  2xl:text-5xl text-4xl tracking-wider whitespace-nowrap font-bold">
                Create Room
              </div>
              <div className="text-white text-[80px] mt-10">
                <RiSwordFill />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="p-10 ">
          <div className="h-20 w-full text-5xl text-center font-bold super">Gbox&apos;s Rooms</div>
          <div className="flex flex-wrap gap-10">
            <div className=" relative    round-parent shadow-2xl ">
              <div className="rectangle h-40 w-80 bg-post  ">
                <p className="text-white text-5xl "></p>
              </div>
              <div className="rounded-full absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-home"></div>
            </div>
            <div className=" relative    round-parent shadow-2xl ">
              <div className="rectangle h-40 w-80 bg-post  ">
                <p className="text-white text-5xl "></p>
              </div>
              <div className="rounded-full absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-home"></div>
            </div>
            <div className=" relative    round-parent shadow-2xl ">
              <div className="rectangle h-40 w-80 bg-post  ">
                <p className="text-white text-5xl "></p>
              </div>
              <div className="rounded-full absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-home"></div>
            </div>
            <div className=" relative    round-parent shadow-2xl ">
              <div className="rectangle h-40 w-80 bg-post  ">
                <p className="text-white text-5xl "></p>
              </div>
              <div className="rounded-full absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-home"></div>
            </div>
          </div>
        </div>
      )}

      <svg
        style={{ visibility: "hidden", position: "absolute" }}
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="round">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="flt_tag"
            />
            <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
          </filter>
        </defs>
      </svg> 
    </Modal>
  );
}
