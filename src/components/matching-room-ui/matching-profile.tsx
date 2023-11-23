"use client";
import Image from "next/image";
import { LuSwords } from "react-icons/lu";
import { FaMicrophone, FaShieldHalved } from "react-icons/fa6";
import { TfiPlus } from "react-icons/tfi";
export default function MatchingProfile({
  profile,
  host,
}: {
  profile: boolean;
  host: boolean;
}) {
  return (
    <div className=" h-[500px] max-w-[200px] w-full relative  ">
      <div
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        className="h-[500px] max-w-[200px]  w-full room-user flex justify-center items-center "
      > <button className="w-20 h-20 round-dashed text-3xl text-muted-foreground  flex justify-center items-center"><TfiPlus /></button></div>
      {profile && (
        <div className="absolute top-0 -left-3 flex flex-col room-user h-[448px] mt-10 bg-primary w-full max-w-[200px]">
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
      )}
    </div>
  );
}
