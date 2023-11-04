import { Button } from "@/components/ui/button";

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
import { HiChatBubbleLeftRight } from "react-icons/hi2";

import useMessageBox from "@/hooks/useMessageBox";
import MessageHeadList from "./message-head-list";
import MessageDetails from "./message-details";

export function MessageBox() {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-transparent text-white hover:bg-transparent text-4xl">
          <HiChatBubbleLeftRight />
        </Button>
      </SheetTrigger>

      <SheetContent className=" bg-home !min-w-[1000px] flex p-0 gap-x-0 rounded-l-3xl">
        <MessageHeadList />
        <MessageDetails />
      </SheetContent>
    </Sheet>
  );
}
