"use client";

import { useCreateGroupChatModal } from "@/hooks/useCreateGroupChatModal";
import Modal from "../modals/Modal";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import CreateGroupChatBody from "./create-group-chat-body";

export default function CreateGroupChatModal() {
  const { isOpen, onClose } = useCreateGroupChatModal((set) => set);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className={cn(
        "max-w-[700px] p-4  justify-evenly flex   bg-home flex-col  !rounded-3xl remove-button"
      )}
    >
     
        <div className=" text-3xl super font-bold tracking-wider text-center pt-4 ">
          Create Your Group Chat
        </div>

        <Separator className="bg-primary h-[1px] w-full " />
        {/* <CreateRoomBody /> */}
        <CreateGroupChatBody/>
    
    </Modal>
  );
}
