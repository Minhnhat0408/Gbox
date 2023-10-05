import { cn } from "@/lib/utils";
import { HiChatBubbleLeftRight, HiMiniUserGroup } from "react-icons/hi2";
import GamerAvatar from "./gamer-avatar";

export default async function SideBarRight() {
  return (
    <aside
      className={cn(
        "fixed right-10 top-0 fade-in h-full py-6 flex flex-col  overflow-y-scroll gap-y-4 "
      )}
    >
      <div
        className={cn(
          "h-fit bg-muted rounded-3xl flex flex-col items-center  py-6 pb-8 px-4 "
        )}
      >
        <div className="text-4xl mb-10">
          <HiMiniUserGroup />
        </div>
        <div className="gap-y-6 flex flex-col">
          <GamerAvatar />
          <GamerAvatar />
          <GamerAvatar />
          <GamerAvatar />
          <GamerAvatar />
        </div>
      </div>
      <div className={cn("h-fit bg-muted rounded-3xl flex flex-col items-center py-6 pb-8 px-4  ")}>
        <div className="text-4xl mb-10 ">
          <HiChatBubbleLeftRight />
        </div>
        <div className="gap-y-6 flex flex-col">
          <GamerAvatar />
          <GamerAvatar />
          <GamerAvatar />
          <GamerAvatar />
        </div>
      </div>
    </aside>
  );
}
