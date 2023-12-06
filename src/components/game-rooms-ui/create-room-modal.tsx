"use client";

import { useCreateRoomModal } from "@/hooks/useCreateRoomModal";
import Modal from "../modals/Modal";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-select";
import { DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import CreateRoomBody from "./create-room-body";
import { useMatchingRoom } from "@/hooks/useMatchingRoom";

export default function CreateRoomModal() {
  const { isOpen, onClose } = useCreateRoomModal((set) => set);

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
        "max-w-[700px] p-0  justify-evenly flex  border-primary border-4  bg-transparent  !rounded-3xl remove-button"
      )}
    >
      <section className="flex flex-col p-4 m-2 bg-layout w-full rounded-2xl">
     
          <div className=" text-3xl super font-bold tracking-wider text-center pb-4 ">
            Create Your Room
          </div>
        
        <Separator className="bg-primary h-[1px] w-full " />
        <CreateRoomBody />
      </section>
    </Modal>
  );
}
