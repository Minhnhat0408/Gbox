"use client";

import useGameRooms from "@/hooks/useGameRooms";
import { CgChevronDoubleLeft } from "react-icons/cg";
import { RiSwordFill } from "react-icons/ri";
import RoomItem from "./room-item";


export default function JoinRoomsUI() {
  const { mode, setMode } = useGameRooms((set) => set);

  return (
    <section className=" p-4 m-2 bg-layout w-full rounded-2xl">
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={() => setMode(undefined)}
          className="text-7xl text-primary"
        >
          <CgChevronDoubleLeft />
        </button>
        <h2 className=" w-full text-5xl text-center font-bold super">
          Gbox&apos;s Rooms
        </h2>
        <button
          onClick={() => setMode("join")}
          className="text-5xl text-primary"
        >
          <RiSwordFill />
        </button>
      </div>
      <div className="grid xl:grid-cols-3 grid-cols-2 gap-10  px-10 ">
        {/* <div className=" relative    round-parent shadow-2xl ">
            <div className="rectangle h-40 w-80 bg-post  ">
              <p className="text-white text-5xl "></p>
            </div>
            <div className="rounded-full absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-home"></div>
          </div> */}
        <RoomItem/>
        <RoomItem/>
        <RoomItem/>
        <RoomItem/>
        <RoomItem/>

        <RoomItem/>


      </div>
    </section>
  );
}
