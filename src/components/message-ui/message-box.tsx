
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import MessageHeadList from "./message-head-list";
import MessageDetails from "./message-details";
import useFriendMessages from "@/hooks/useFriendMessages";

export function MessageBox() {
  const { isOpen, onOpen, onClose } = useFriendMessages((set) => set);
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
                <HiChatBubbleLeftRight />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SheetTrigger>

      <SheetContent className=" bg-home !min-w-[1000px] flex p-0 gap-x-0 rounded-l-3xl">
        <MessageHeadList />
        <MessageDetails />
      </SheetContent>
    </Sheet>
  );
}
