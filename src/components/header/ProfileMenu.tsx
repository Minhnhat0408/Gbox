"use client";
import { IoSchool } from "react-icons/io5";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Separator } from "../ui/separator";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaStar } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaPowerOff, FaUserAlt } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { ProfilesTypeWithCoach } from "@/hooks/useUser";
import { useOpenProfilesHeaders } from "@/hooks/useOpen";
import Image from "next/image";
function ProfileMenu({
  children,
  data,
}: {
  children: React.ReactNode;
  data: ProfilesTypeWithCoach | null;
}) {
  const { supabaseClient } = useSessionContext();

  const { open, setOpen } = useOpenProfilesHeaders();

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
    <Popover
      onOpenChange={(open: boolean) => {
        setOpen(open);
      }}
      open={open}
    >
      <PopoverTrigger
        onClick={(e) => {
          setOpen(!open);
        }}
      >
        <div className="w-10 h-10 rounded-full cursor-pointer">{children}</div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className=" bg-muted rounded-lg border-transparent max-w-[260px] flex flex-col px-2 pb-2 pt-0"
      >
        <div className="py-2 flex flex-col justify-center">
          <div className="flex items-center gap-x-3 px-4 py-2">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src={data?.avatar || "/avatar.jpg"}
              className="object-cover object-center w-10 h-10 rounded-full"
              alt="avatar"
            ></Image>
            <div className="super text-xl font-bold line-clamp-1">
              {data?.name}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className=" px-2 group transition hover:bg-black/20 py-[2px]">
            <div
              onClick={(e: any) => {
                router.push("/");
                router.refresh();
                setOpen(false);
              }}
              className=" cursor-pointer py-2 flex gap-x-3 items-center"
            >
              <div className="center mr-1 w-10 h-10 rounded-full ">
                <GoHomeFill className="text-2xl group-hover:text-primary text-gray-200" />
              </div>
              <span className="group-hover:text-primary text-base font-medium">
                Home Page
              </span>
            </div>
          </div>
          {data?.is_admin && (
            <div className="px-2 group transition hover:bg-black/20 py-[2px]">
              <div
                onClick={(e) => {
                  router.push("/admin/manage-request");
                }}
                className=" cursor-pointer py-2 flex gap-x-3 items-center"
              >
                <div className="center mr-1 w-10 h-10 rounded-full ">
                  <FaShieldAlt className="text-xl group-hover:text-primary text-gray-200" />
                </div>
                <span className="group-hover:text-primary text-base font-medium">
                  Admin Panel
                </span>
              </div>
            </div>
          )}
          <div className="px-2 group transition hover:bg-black/20 py-[2px]">
            <div
              onClick={(e) => {
                router.push("/user/" + data?.name);
                setOpen(false);
              }}
              className="cursor-pointer py-2 flex gap-x-3 items-center"
            >
              <div className="center mr-1 w-10 h-10 rounded-full ">
                <FaUserAlt className="text-lg  group-hover:text-primary text-gray-200" />
              </div>
              <span className="group-hover:text-primary text-base font-medium">
                User Profile
              </span>
            </div>
          </div>
          {data?.coach_profiles && (
            <div className=" px-2 group transition hover:bg-black/20 py-[2px]">
              <div
                onClick={(e) => {
                  router.push("/coach/" + data?.name);
                  setOpen(false);
                }}
                className="cursor-pointer py-2 flex gap-x-3 items-center"
              >
                <div className="center mr-1 w-10 h-10 rounded-full ">
                  <FaStar className="text-2xl  group-hover:text-primary text-gray-200" />
                </div>
                <span className="group-hover:text-primary text-base font-medium">
                  Coach Profile
                </span>
              </div>
            </div>
          )}
          <div className=" px-2 group transition hover:bg-black/20 py-[2px]">
            <div
              onClick={(e) => {
                router.push("/coach/apply/application");
              }}
              className=" cursor-pointer py-2 flex gap-x-3 items-center"
            >
              <div className="center mr-1 w-10 h-10 rounded-full ">
                <IoSchool className="text-2xl group-hover:text-primary text-gray-200" />
              </div>
              <span className="group-hover:text-primary text-base font-medium">
                Apply Coach
              </span>
            </div>
          </div>
          <div className=" px-2 group transition hover:bg-black/20 py-[2px] pb-1">
            <div
              onClick={(e) => {
                router.push("/request-history");
              }}
              className=" cursor-pointer py-2 flex gap-x-3 items-center"
            >
              <div className="center mr-1 w-10 h-10 rounded-full ">
                <FaClockRotateLeft className="text-xl  group-hover:text-primary text-gray-200" />
              </div>
              <span className="group-hover:text-primary text-base font-medium">
                Request History
              </span>
            </div>
          </div>
        </div>
        <Separator className="bg-primary" />
        <div className=" group hover:bg-black/20 py-[2px] pt-1">
          <div
            onClick={logout}
            className=" px-2 cursor-pointer py-1  flex gap-x-3 items-center"
          >
            <div className="center mr-1 w-10 h-10 rounded-full ">
              <FaPowerOff className="text-xl  group-hover:text-primary text-gray-200" />
            </div>
            <span className="group-hover:text-primary text-base font-medium">
              Log out
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ProfileMenu;
