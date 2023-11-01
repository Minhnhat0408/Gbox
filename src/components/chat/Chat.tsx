import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HiChatBubbleLeftRight } from "react-icons/hi2"
import ChatList from "./ChatList"
import Message from "./Message"
 
export function Chat() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-transparent text-white hover:bg-transparent text-4xl">
          <HiChatBubbleLeftRight />
        </Button>
      </SheetTrigger>

      <SheetContent className="rounded-l-3xl !min-w-[900px] pr-0">
        {/* <SheetHeader>
          <SheetTitle>Chat</SheetTitle>
          <SheetDescription>
            Chat chat chat
          </SheetDescription>
        </SheetHeader> */}

        
        <div className="flex gap-4 py-4 w-full h-full">
          <ChatList />
          <Message />
        </div>
      </SheetContent>
    </Sheet>
  )
}