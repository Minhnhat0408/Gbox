import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HiMiniUserGroup } from "react-icons/hi2";

import useGroupChat from "@/hooks/useGroupChat";
import GroupChatHeadList from "./group-chat-head-list";
import GroupChatDetails from "./group-chat-details";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
export function GroupChatBox() {
  const { isOpen, onOpen, onClose } = useGroupChat();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Sheet open={isOpen} onOpenChange={onChange}>
      <SheetTrigger asChild>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>
              <div
                onClick={onOpen}
                className="bg-transparent text-white hover:text-primary hover:bg-transparent text-4xl"
              >
                <HiMiniUserGroup />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Group Chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SheetTrigger>

      <SheetContent className=" bg-home !min-w-[1000px] flex p-0 gap-x-0 rounded-l-3xl">
        <GroupChatHeadList />
        <GroupChatDetails />
      </SheetContent>
    </Sheet>
  );
}
