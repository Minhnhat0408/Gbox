import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageHeadType } from "@/types/supabaseTableType";
import useFriendMessages from "@/hooks/useFriendMessages";
import useMessageBox from "@/hooks/useMessageBox";

export default function GamerAvatar({
  messageHead,
}: {
  messageHead?: MessageHeadType;
}) {
  const { onOpen } = useFriendMessages((set) => set);
  const { setCurrentMessage } = useMessageBox((set) => set);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={() => {
              if (messageHead) {
                setCurrentMessage(messageHead);
                onOpen();
              }
            }}
            className="relative flex justify-center cursor-pointer"
          >
            <Avatar className="w-12 h-12">
              <AvatarImage src={messageHead?.avatar || "image 1.png"} />
              <AvatarFallback className="bg-gray-700">CN</AvatarFallback>
            </Avatar>
            <div className="right-1 absolute top-0 z-10 w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="absolute -bottom-2  bg-primary p-1 py-[2px] rounded-sm text-[8px]">
              In Game
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-home p-4">
          <div className="gap-x-2 flex">
            <Avatar className="w-12 h-12">
              <AvatarImage src={messageHead?.avatar || "image 1.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="gap-y-2">
              <p className="">{messageHead ? messageHead.name : "GboxGamer"}</p>
              <span className="text-muted-foreground italic">
                {messageHead ? messageHead.location : "No Where"}
              </span>
            </div>
          </div>
          <p className="super mt-3 font-bold">Playing Rocket League</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
