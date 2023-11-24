"use client";
import Image from "next/image";
import { LuSwords, LuBan } from "react-icons/lu";
import { FaMicrophone, FaShieldHalved } from "react-icons/fa6";
import { TfiPlus } from "react-icons/tfi";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "usehooks-ts";
import { CgProfile } from "react-icons/cg";
export default function MatchingProfile({
  profile,
  host,
}: {
  profile: boolean;
  host: boolean;
}) {
  const ref = useRef(null);

  const [openOptions, setOpenOptions] = useState(false);
  useOnClickOutside(ref, () => {
    setOpenOptions(false);
  });
  return (
    <div ref={ref} className=" h-[500px] max-w-[200px] w-full relative  ">
      <div
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        className="h-[500px] max-w-[200px]  w-full room-user flex justify-center items-center "
      >
        <button className="w-20 h-20 round-dashed text-3xl text-muted-foreground  flex justify-center items-center">
          <TfiPlus />
        </button>
      </div>
      {profile && (
        <>
          <div
            onClick={() => {
              setOpenOptions(true);
            }}
            className={cn(
              "absolute top-10 peer -left-3 flex hover:top-5 duration-500  flex-col room-user h-[448px] bg-primary w-full max-w-[200px]",
              openOptions && "top-5"
            )}
          >
            <div className="flex room-user  ">
              <div className="bg-black w-6 h-[400px] relative ">
                <span className=" rotate-90 absolute w-fit h-fit top-24 -left-12 font-bold ">
                  MinhMatMong
                </span>
              </div>
              <div className="w-full overflow-hidden h-[400px]">
                <Image
                  src={"/images/login-bg.png"}
                  width={0}
                  height={0}
                  alt="ava"
                  sizes="100vw"
                  className="h-full w-auto object-cover"
                />
              </div>
            </div>
            <div className="w-full text-3xl -translate-y-2 flex  justify-center">
              {host ? <LuSwords /> : <FaShieldHalved />}
            </div>
          </div>
          {openOptions && (
            <div className="absolute -left-3  top-5 duration-500 gap-y-4  flex flex-col items-center justify-center room-user h-[448px] bg-black/70 w-full max-w-[200px]">
              <button className="flex hover:bg-[#00d9f5]/70 bg-[#00d9f5] rounded-full items-center w-24 py-1  justify-center">
                <CgProfile /> <span className="ml-2">Profile</span>
              </button>
              <button className="flex hover:bg-primary/70 bg-primary rounded-full items-center w-24 py-1  justify-center">
                <LuSwords /> <span className="ml-2">Owner</span>
              </button>
              <button className="flex hover:bg-red-400/70 bg-red-400 rounded-full items-center w-24 py-1  justify-center ">
                <LuBan /> <span className="ml-2">Kick</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
