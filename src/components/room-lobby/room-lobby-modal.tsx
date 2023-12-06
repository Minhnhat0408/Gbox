"use client";
import { CgChevronDoubleLeft } from "react-icons/cg";
import { RiSwordFill } from "react-icons/ri";
import Modal from "../modals/Modal";
import useRoomLobby from "@/hooks/useRoomLobby";
import { cn } from "@/lib/utils";
import useMatchingOptions from "@/hooks/useMatchingOptions";
import RoomLobbyBody from "./room-lobby-body";
import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import { useCreateRoomModal } from "@/hooks/useCreateRoomModal";


export default function RoomLobbyModal() {
  const { isOpen, onClose } = useRoomLobby((set) => set);
  const { onOpen: openMatchingOptions } = useMatchingOptions((set) => set);
  const { roomId, onOpen: openMatchingRoom } = useMatchingRoom((set) => set);
  const { onOpen: openCreateRoom } = useCreateRoomModal((set) => set);
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
        "max-w-[80vw] p-0  h-[90vh] justify-evenly flex  border-primary border-4 bg-transparent  !rounded-3xl remove-button"
      )}
    >
      <section className=" p-4 m-2 bg-layout w-full flex flex-col rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => {
              onClose();
              openMatchingOptions();
            }}
            className="text-7xl text-primary"
          >
            <CgChevronDoubleLeft />
          </button>
          <h2 className=" w-full text-5xl text-center font-bold super">
            Gbox&apos;s Rooms
          </h2>
          <button onClick={() => {
            onClose();
            if(roomId) {
              openMatchingRoom()
            }else{
              openCreateRoom();
  
            }
          }} className="text-5xl text-primary">
            <RiSwordFill />
          </button>
        </div>
        <RoomLobbyBody />
        {/* <svg
          style={{ visibility: "hidden", position: "absolute" }}
          width="0"
          height="0"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <defs>
            <filter id="round">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="8"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="flt_tag"
              />
              <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
            </filter>
          </defs>
        </svg> */}
      </section>
    </Modal>
  );
}
