"use client";

import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import Modal from "../modals/Modal";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-select";
import { FaGamepad } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import MatchingRoomBody from "./matching-room-body";
import useMessageBox from "@/hooks/useMessageBox";
import useFriendMessages from "@/hooks/useFriendMessages";

export default function MatchingRoomModal() {
  const { isOpen, onClose } = useMatchingRoom((set) => set);
  const { onOpen: openChat } = useFriendMessages((set) => set);
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
        "max-w-[80vw] p-0  justify-evenly flex  border-primary border-4  bg-transparent  !rounded-3xl remove-button"
      )}
    >
      <section className="flex flex-col p-4 m-2 bg-layout w-full rounded-2xl">
        <div className=" flex pb-4   w-full items-center">
          <h2 className="text-3xl  super font-bold tracking-wider">
            MinhMatMong&apos;s Room
          </h2>
          <div
            className={cn(
              "rounded-full font-bold h-fit py-1 items-center text-lg ml-4 bg-primary px-4 w-fit flex "
            )}
          >
            <div className="mr-2">
              <FaGamepad />
            </div>
            League of Legend
          </div>
          {/* <button onClick={() => {
            onClose();
          }} className="text-primary text-5xl ml-auto " >
         

          </button> */}
          <AlertDialog>
            <AlertDialogTrigger className="text-primary text-5xl ml-auto ">
              <IoMdExit />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to leave the room
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Once leave the room you lose your previous privileges
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    onClose();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <Separator className="bg-primary h-[1px] w-full " />
        <MatchingRoomBody />
        {/* <button
          onClick={() => {
            openChat();
          }}
          className="bg-psrimary text-white text-2xl font-bold w-full py-2 rounded-2xl mt-4"
        >
          Chat
        </button> */}
      </section>
    </Modal>
  );
}
