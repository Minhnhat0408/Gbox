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
import useFriendMessages from "@/hooks/useFriendMessages";
import useMessageBox from "@/hooks/useMessageBox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CircleEqual,
  Copyright,
  Edit2Icon,
  Group,
  Trash,
  User2Icon,
  UserX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { BiDotsHorizontal } from "react-icons/bi";
import { useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import useGroupChatBox from "@/hooks/useGroupChatBox";
import useGroupMembers from "@/hooks/useGroupMembers";
import { IoMdExit } from "react-icons/io";
import useGroupChat from "@/hooks/useGroupChat";
import { MdOutlineGroupAdd } from "react-icons/md";
import useGroupAddMembers from "@/hooks/useGroupAddMembers";

export default function GroupChatOptions() {
  //   const { currentMessage } = useMessageBox((set) => set);
  const { onClose } = useFriendMessages((set) => set);
  const { supabaseClient } = useSessionContext();

  const {
    currentGroup,
    setCurrentGroup,
    onClose: closeGroupChat,
  } = useGroupChatBox();
  const { groupChatHeads, setGroupChatHeads } = useGroupChat();
  const { setMembers, setCurrentMember, currentMember, onOpen } =
    useGroupMembers();
  const { onOpen: onOpenAddMembers } = useGroupAddMembers();
  const { user, userDetails } = useUser();
  const router = useRouter();
  const handleDeleteGroup = async () => {
    if (currentGroup && user) {
      const { data, error } = await supabaseClient
        .from("group_chat")
        .delete()
        .eq("id", currentGroup.id);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Delete messages success !!");
        setCurrentGroup(undefined);
        setCurrentMember(undefined);
        setMembers([]);
        onClose();
      }
    }
  };
  const handleLeaveGroup = async () => {
    if (currentGroup && user) {
      const { data, error } = await supabaseClient
        .from("group_users")
        .delete()
        .eq("user_id", user.id)
        .eq("group_id", currentGroup.id);

      await supabaseClient.from("messages").insert({
        content: `${userDetails?.name} has left the group`,
        group_id: currentGroup.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Leave group success !!");
        //filter the group out of groupchatheads
        const newGroupChatHeads = groupChatHeads.filter(
          (item) => item.id !== currentGroup.id
        );
        setGroupChatHeads(newGroupChatHeads);
        setCurrentGroup(undefined);
        setCurrentMember(undefined);
        setMembers([]);
        closeGroupChat();
      }
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="  text-white text-2xl w-[40px] h-[40px] hover:bg-primary rounded-full flex justify-center items-center ">
            <BiDotsHorizontal />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-56">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {currentMember?.role !== "member" && (
            <DropdownMenuItem
            //   onClick={() => {
            //     router.push(`/user/${currentMessage?.name}`);
            //     onClose();
            //   }}
            >
              <Edit2Icon className="mr-2 h-4 w-4" />
              <span>Edit Group</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={onOpen}>
            <Group className="mr-2 h-4 w-4" />
            <span>See Members</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpenAddMembers}>
            <div className="text-xl flex justify-center text-center mr-2">
              <MdOutlineGroupAdd />
            </div>
            <span>Add Members</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <AlertTriangle className="mr-2 h-4 w-4" />
              <span>Report</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <UserX className="mr-2 h-4 w-4" />
                  <span>Harassing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CircleEqual className="mr-2 h-4 w-4" />
                  <span>Inappropriate</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copyright className="mr-2 h-4 w-4" />
                  <span>Copyright</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          {currentMember?.role === "creator" ? (
            <DropdownMenuItem onClick={() => {}}>
              <AlertDialogTrigger asChild>
                <div className="flex text-red-400">
                  <Trash className="mr-2 h-4 w-4 " />
                  <span>Delete Group</span>
                </div>
              </AlertDialogTrigger>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => {}}>
              <AlertDialogTrigger asChild>
                <div className="flex  text-red-400">
                  <div className="text-xl flex justify-center text-center mr-2">
                    <IoMdExit />
                  </div>

                  <span>Leave Group</span>
                </div>
              </AlertDialogTrigger>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all
            messages in this message box and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (currentMember?.role === "creator") {
                handleDeleteGroup();
              } else {
                handleLeaveGroup();
              }
            }}
            className="bg-red-400 hover:bg-red-300 text-white"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
