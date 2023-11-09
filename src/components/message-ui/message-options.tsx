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

export default function MessageOptions() {
  const { currentMessage, } = useMessageBox((set) => set);
  const { onClose } = useFriendMessages((set) => set);
  const { supabaseClient } = useSessionContext();
  const {user} = useUser()
  const router = useRouter();
  const handleDeleteMessage = async () => {
    if(currentMessage && user) {
      const { data, error } = await supabaseClient
      .from("messages")
      .delete()
      .or(`sender_id.eq.${user?.id},receiver_id.eq.${user?.id}`)
      .or(
        `sender_id.eq.${currentMessage.id},receiver_id.eq.${currentMessage.id}`
      );
      if(error) {
        toast.error(error.message)
      }else{
        toast.success('Delete messages success !!'  )
        onClose()
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

          <DropdownMenuItem
            onClick={() => {
              router.push(`/user/${currentMessage?.name}`);
              onClose();
            }}
          >
            <User2Icon className="mr-2 h-4 w-4" />
            <span>Visit Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>
            <AlertDialogTrigger asChild>
              <div className="flex">
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete Conversation</span>
              </div>
            </AlertDialogTrigger>
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
          <AlertDialogAction  onClick={handleDeleteMessage} className="bg-red-400 hover:bg-red-300 text-white">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
