"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import useGroupMembers from "@/hooks/useGroupMembers";
import {
  Ban,
  ShieldAlert,
  ShieldCheck,
  ShieldEllipsis,
  ShieldQuestion,
  User,
} from "lucide-react";
import dayjs from "dayjs";
import { BiDotsVertical, BiDotsVerticalRounded } from "react-icons/bi";
import { GroupMemberType } from "@/types/supabaseTableType";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { useState } from "react";
export default function GroupMemberItem({
  member,
}: {
  member: GroupMemberType;
}) {
  const { currentMember, members, setMembers } = useGroupMembers();
  const [isLoading, setIsLoading] = useState(false);
  const { supabaseClient } = useSessionContext();
  const handleKickMember = async () => {
    if (
      !currentMember ||
      !currentMember.group_id ||
      (currentMember.role !== "creator" && currentMember.role !== "admin")
    ) {
      toast.error("You don't have permission to kick member !!");
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabaseClient
        .from("group_users")
        .delete()
        .eq("user_id", member.user_id)
        .eq("group_id", currentMember.group_id);

      if (error) throw error;

      //add message 
      const { data: messageData, error: messageError } = await supabaseClient
        .from("messages")
        .insert(
          {
            group_id: currentMember.group_id,
            message: `${member.profiles.name} has been kicked`,
            
          },
        );
      const newMembers = members.filter(
        (item) => item.user_id !== member.user_id
      );
      setMembers(newMembers);
      setIsLoading(false);
      toast.success(`${member.profiles.name} has been kicked !!`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleMakeAdmin = async () => {
    if (
      !currentMember ||
      !currentMember.group_id ||
      (currentMember.role !== "creator" && currentMember.role !== "admin")
    ) {
      toast.error("You don't have permission to make admin !!");
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabaseClient
        .from("group_users")
        .update({ role: "admin" })
        .eq("user_id", member.user_id)
        .eq("group_id", currentMember.group_id);

      if (error) throw error;

      const newMembers = members.map((item) => {
        if (item.user_id === member.user_id) {
          return { ...item, role: "admin" };
        }
        return item;
      });

      setMembers(newMembers);
      setIsLoading(false);
      toast.success("Make admin success !!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleMakeMember = async () => {
    if (
      !currentMember ||
      !currentMember.group_id ||
      (currentMember.role !== "creator" && currentMember.role !== "admin")
    ) {
      toast.error("You don't have permission to make member !!");
      return;
    }
    try {
      setIsLoading(true);
      const { data, error } = await supabaseClient
        .from("group_users")
        .update({ role: "member" })
        .eq("user_id", member.user_id)
        .eq("group_id", currentMember.group_id);

      if (error) throw error;

      const newMembers = members.map((item) => {
        if (item.user_id === member.user_id) {
          return { ...item, role: "member" };
        }
        return item;
      });

      setMembers(newMembers);
      setIsLoading(false);
      toast.success("Make member success !!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full select-none p-4 flex justify-between items-center">
      <div className="flex gap-x-4">
        <Image
          src={member.profiles.avatar || "/avatar.jpg"}
          alt=""
          className="w-16 h-16 rounded-full"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="flex flex-col justify-center gap-y-2">
          <div className="font-bold flex gap-x-2 items-center">
            {member.profiles.name}{" "}
            {member.role === "creator" && (
              <ShieldAlert className="text-red-400 w-5 h-5 " />
            )}
            {member.role === "admin" && (
              <ShieldCheck className="text-green-400 w-5 h-5 " />
            )}
          </div>
          <div className="text-zinc-400 text-sm">
            Joined since {dayjs(member.joined_at).format("DD/MM/YYYY")}
          </div>
        </div>
      </div>

      {!isLoading ? (
        currentMember?.role !== "member" &&
        member.role !== "creator" && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="  text-white text-2xl w-[40px] h-[40px] hover:bg-primary rounded-full flex justify-center items-center ">
                <BiDotsVerticalRounded />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              {" "}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <ShieldQuestion className="mr-2 h-4 w-4" />
                  <span>Role</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={handleMakeAdmin}>
                      <ShieldCheck className="mr-2 text-green-400 h-4 w-4" />
                      <span>Admin</span>
                      {member.role === "admin" && (
                        <AiOutlineCheck className="ml-auto" />
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMakeMember}>
                      <User className="mr-2 text-yellow-400  h-4 w-4" />
                      <span>Member</span>
                      {member.role === "member" && (
                        <AiOutlineCheck className="ml-auto" />
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem onClick={handleKickMember}>
                <Ban className="mr-2 h-4 w-4" />
                <span>Kick</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      ) : (
        <div className="w-[40px] h-[40px] flex justify-center items-center ">
          <div className="text-2xl animate-spin text-primary">
            <AiOutlineLoading3Quarters />
          </div>
        </div>
      )}
    </div>
  );
}
