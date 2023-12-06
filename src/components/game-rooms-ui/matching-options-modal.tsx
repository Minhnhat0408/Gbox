"use client";

import Modal from "../modals/Modal";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiSwordFill } from "react-icons/ri";
import { useCreateRoomModal } from "@/hooks/useCreateRoomModal";
import useMatchingOptions from "@/hooks/useMatchingOptions";
import useRoomLobby from "@/hooks/useRoomLobby";
import { useMatchingRoom } from "@/hooks/useMatchingRoom";

export default function MatchingOptionsModal() {
  const { onOpen: openCreateRoom } = useCreateRoomModal((set) => set);
  const { onOpen: openRoomLobby } = useRoomLobby((set) => set);
  const { roomId, onOpen: openMatchingRoom } = useMatchingRoom((set) => set);
  const { isOpen, onClose } = useMatchingOptions((set) => set);
  const joinRoomRef = useRef<HTMLDivElement | null>(null);
  const createRoomRef = useRef<HTMLDivElement | null>(null);
  // useOnClickOutside(joinRoomRef, () => {
  //   onClose();
  // });
  // useOnClickOutside(createRoomRef, () => {
  //   onClose();
  // });

  //BUG fix  the onClick in the middle 
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
        "max-w-[80vw] p-0   h-[90vh]  justify-evenly flex bg-transparent  !rounded-3xl remove-button"
      )}
    >
      <div
        onClick={() => {

          openRoomLobby();
          
          onClose();
          
        
        }}
        ref={joinRoomRef}
        className=" box-border cursor-pointer relative group  rounded-3xl p-2 hover:border-primary duration-500 border-[#1c5349] overflow-hidden border-4  h-full xl:w-[30vw] w-[360px] "
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
        onClick={() => {
          // setMode("create");
          onClose();
          if (roomId) {
            openMatchingRoom();
          } else {
            openCreateRoom();
          }
        }}
        ref={createRoomRef}
        className=" box-border cursor-pointer group relative overflow-hidden hover:border-primary duration-500 border-[#1c5349]  rounded-3xl p-2  border-4 h-full xl:w-[30vw] w-[360px] "
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
    </Modal>
  );
}
