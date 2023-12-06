import { IoMdPersonAdd } from "react-icons/io";
import { useInviteFriendGroupChatModal } from "@/hooks/useInviteFriendGroupChatModal";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function AddFriendInput({ err }: { err: boolean }) {
  const { onOpen } = useInviteFriendGroupChatModal();

  return (
    <Button
      onClick={() => {
        onOpen();
      }}
      className={cn(" items-center flex",err && "bg-red-400")}
      variant={"secondary"}
    >
      <IoMdPersonAdd className="mr-2 text-lg  " />
      Choose Friend to Invite
    </Button>
  );
}
