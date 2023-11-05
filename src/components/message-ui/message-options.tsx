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
import { on } from "events";
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

export default function MessageOptions() {
  const { currentMessage } = useMessageBox((set) => set);
  const {onClose} = useFriendMessages((set) => set);
  const router = useRouter();
  return (
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
        <DropdownMenuItem>
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete Conversation</span>
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
  );
}
