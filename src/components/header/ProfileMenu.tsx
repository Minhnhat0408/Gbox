/* eslint-disable @next/next/no-img-element */
"use client";

import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { ProfilesType } from "@/types/supabaseTableType";
import { Separator } from "../ui/separator";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { RiHome2Line } from "react-icons/ri";

function ProfileMenu({
  children,
  data,
}: {
  children: React.ReactNode;
  data: ProfilesType | null;
}) {
  const { supabaseClient } = useSessionContext();

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const logout = async () => {
    toast.promise(supabaseClient.auth.signOut(), {
      loading: "Signing out",
      success: () => {
        router.push("/sign-in");
        return "Signed out";
      },
      error: "Error signing out",
    });
  };

  return (
    <Popover open={open}>
      <PopoverTrigger
        onClick={(e) => {
          setOpen(!open);
        }}
      >
        <div className="w-10 h-10 rounded-full cursor-pointer">{children}</div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="bg-muted max-w-[185px] flex flex-col px-0 py-0"
      >
        <div className="pt-2 flex flex-col justify-center">
          <div className="flex items-center gap-x-3 px-3 py-2">
            <img
              src={data?.avatar || "avatar.jpg"}
              className="object-cover object-center w-10 h-10 rounded-full"
              alt="avatar"
            ></img>
            <div className="super font-bold ">{data?.name}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="px-4 group hover:bg-black/20">
            <div
              onClick={(e: any) => {
                router.push("/");
                router.refresh();
                setOpen(false);
              }}
              className=" cursor-pointer py-3 flex gap-x-3 items-center"
            >
              <RiHome2Line className="text-lg w-[20px] group-hover:text-primary text-gray-200" />
              <span className="group-hover:text-primary text-sm font-medium">
                Home Page
              </span>
            </div>
          </div>
          <div className="px-4 group hover:bg-black/20">
            <div
              onClick={(e) => {
                router.push("/user/" + data?.name);
                setOpen(false);
              }}
              className="cursor-pointer py-3 flex gap-x-3 items-center"
            >
              <FaRegUser className="text-base w-[20px]  group-hover:text-primary text-gray-200" />
              <span className="group-hover:text-primary text-sm font-medium">
                User Profile
              </span>
            </div>
          </div>
          <div className="px-4 group hover:bg-black/20">
            <div
              onClick={(e) => {
                router.push("/coach/apply/application");
              }}
              className=" cursor-pointer py-3 flex gap-x-3 items-center"
            >
              <IoSchool className="text-lg w-[20px]  group-hover:text-primary text-gray-200" />
              <span className="group-hover:text-primary text-sm font-medium">
                Coach Apply
              </span>
            </div>
          </div>
          <div className="px-4 group hover:bg-black/20">
            <div
              onClick={(e) => {
                router.push("/request-history");
              }}
              className=" cursor-pointer py-3 flex gap-x-3 items-center"
            >
              <FaClockRotateLeft className="text-base w-[20px]  group-hover:text-primary text-gray-200" />
              <span className="group-hover:text-primary text-sm font-medium">
                Request History
              </span>
            </div>
          </div>
        </div>
        <Separator className="bg-muted-foreground" />
        <div className="px-2 group hover:bg-black/20">
          <div
            onClick={logout}
            className=" cursor-pointer py-3 px-2 flex gap-x-3 items-center"
          >
            <FaPowerOff className="text-base w-[20px]  group-hover:text-primary text-gray-200" />
            <span className="group-hover:text-primary text-sm font-medium">
              Log out
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ProfileMenu;
