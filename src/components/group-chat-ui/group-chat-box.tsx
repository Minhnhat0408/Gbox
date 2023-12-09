import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HiChatBubbleLeftRight, HiMiniUserGroup } from "react-icons/hi2";

import useGroupChat from "@/hooks/useGroupChat";
import GroupChatHeadList from "./group-chat-head-list";
import GroupChatDetails from "./group-chat-details";

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
        <Button
          onClick={onOpen}
          className="bg-transparent text-white hover:text-primary hover:bg-transparent text-4xl"
        >
          <HiMiniUserGroup />
        </Button>
      </SheetTrigger>

      <SheetContent className=" bg-home !min-w-[1000px] flex p-0 gap-x-0 rounded-l-3xl">
        <GroupChatHeadList />
        <GroupChatDetails />
      </SheetContent>
    </Sheet>
  );
}
