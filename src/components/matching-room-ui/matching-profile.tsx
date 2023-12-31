"use client";
import Image from "next/image";
import { LuSwords, LuBan } from "react-icons/lu";
import { FaMicrophone, FaShieldHalved } from "react-icons/fa6";
import { TfiPlus } from "react-icons/tfi";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "usehooks-ts";
import { CgProfile } from "react-icons/cg";
import { ProfilesType, RoomUserType } from "@/types/supabaseTableType";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { RiRobot2Line } from "react-icons/ri";
import RoomInviteButton from "../room-invite/room-invite-button";
import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import { useSessionContext } from "@supabase/auth-helpers-react";

export default function MatchingProfile({
  member,
  ind,
  host,
  className
}: {
  member: RoomUserType | "dummy" | null;
  host: boolean;
  className?:string;
  ind: number;
}) {
  const ref = useRef(null);
  const { userDetails } = useUser();
  const router = useRouter();
  const { roomData, onClose, members, setMembers } = useMatchingRoom(
    (set) => set
  );
  const { supabaseClient } = useSessionContext();
  const [openOptions, setOpenOptions] = useState(false);

 
  useOnClickOutside(ref, () => {
    setOpenOptions(false);
  });
  const handleKick = async () => {
    if (!members || !roomData) return;
    if (member === "dummy") {
      const allMembers = [...members];
      allMembers.splice(ind, 1);
      allMembers.push(null);
      setMembers(allMembers);
      setOpenOptions(false);
      const { data, error } = await supabaseClient
        .from("rooms")
        .update({ current_people: roomData?.current_people - 1 })
        .eq("id", roomData?.id)
        .single();
      if (error) {
        console.log(error);
      }
    } else if (member) {
      const allMembers = [...members];
      allMembers.splice(ind, 1);
      allMembers.push(null);
      setMembers(allMembers);
      setOpenOptions(false);
      await supabaseClient
        .from("rooms")
        .update({ current_people: roomData?.current_people - 1 })
        .eq("id", roomData?.id)
        .single();

      await supabaseClient
        .from("room_users")
        .delete()
        .eq("user_id", member?.user_id)
        .eq("room_id", roomData?.id)
        .single();
    }
  };

  const handleTransferOwner = async () => {
    if (!members || !roomData || member === 'dummy') return;
    if (member) {
      setOpenOptions(false);
      await supabaseClient
        .from("rooms")
        .update({ host_id: member?.user_id })
        .eq("id", roomData?.id)
    }
  }
  return (
    <div ref={ref} className={cn(" h-[500px] max-w-[200px] w-full relative  ",className)}>
      <div
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        className="h-[500px] max-w-[200px]  w-full room-user flex justify-center items-center "
      >
      
        <RoomInviteButton />
      </div>

      {member && (
        <>
          <div
            onClick={() => {
              if (
                member !== "dummy" &&
                member.profiles.name === userDetails?.name
              ) {
                return;
              }
              if (member === "dummy" && userDetails?.id !== roomData?.host_id)
                return;
              setOpenOptions(true);
            }}
            className={cn(
              "absolute top-10 peer -left-3 flex hover:top-5 duration-500  flex-col room-user h-[448px] bg-primary w-full max-w-[200px]",
              openOptions && "top-5",
              host && "bg-[#00d8f5dc]",
              member === "dummy" && "bg-red-400"
            )}
          >
            <div className="flex  room-user  ">
              <div className="w-full overflow-hidden relative flex flex-col  justify-center items-center   h-[400px]">
                <Image
                  src={
                    member !== "dummy"
                      ? member.profiles.avatar || "/images/login-bg.png"
                      : "/images/login-bg.png"
                  }
                  width={0}
                  height={0}
                  alt="ava"
                  sizes="100vw"
                  className=" -z-[1] absolute blur top-0 h-full w-auto object-cover"
                />
                <Image
                  src={
                    member !== "dummy"
                      ? member.profiles.avatar || "/images/login-bg.png"
                      : "/images/login-bg.png"
                  }
                  width={0}
                  height={0}
                  alt="ava"
                  sizes="100vw"
                  className={cn(
                    " rounded-full h-20 w-20 object-cover border-2 border-primary",
                    host && "border-[#00d8f5dc]",
                    member === "dummy" && "border-red-400"
                  )}
                />
                <p className="font-bold mt-5 text-center">
                  {" "}
                  {member !== "dummy" ? member.profiles.name : "Gbox Dummy"}
                </p>
              </div>
            </div>
            <div className="w-full text-3xl -translate-y-2 flex  justify-center">
              {host ? (
                <LuSwords />
              ) : member === "dummy" ? (
                <RiRobot2Line />
              ) : (
                <FaShieldHalved />
              )}
            </div>
          </div>
          {openOptions && (
            <div className="absolute -left-3  top-5 duration-500 gap-y-4  flex flex-col items-center justify-center room-user h-[448px] bg-black/70 w-full max-w-[200px]">
              {member !== "dummy" && (
                <>
                  <button
                    onClick={() => {
                      router.push(`/user/${member.profiles.name}`);
                      onClose();
                    }}
                    className="flex hover:bg-[#00d9f5]/70 bg-[#00d9f5] rounded-full items-center w-24 py-1  justify-center"
                  >
                    <CgProfile /> <span className="ml-2">Profile</span>
                  </button>
                  {userDetails?.id === roomData?.host_id && (
                    <button onClick={handleTransferOwner} className="flex hover:bg-primary/70 bg-primary rounded-full items-center w-24 py-1  justify-center">
                      <LuSwords /> <span className="ml-2">Owner</span>
                    </button>
                  )}
                </>
              )}

              {userDetails?.id === roomData?.host_id && (
                <button
                  onClick={handleKick}
                  className="flex hover:bg-red-400/70 bg-red-400 rounded-full items-center w-24 py-1  justify-center "
                >
                  <LuBan /> <span className="ml-2">Kick</span>
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
