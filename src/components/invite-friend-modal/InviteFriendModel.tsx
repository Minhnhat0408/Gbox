"use client";

import { useInviteFriendModal } from "@/hooks/useInviteFriendModal";
import Modal from "../modals/Modal";
import { DialogHeader } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { ImSpinner8 } from "react-icons/im";
import { cn } from "@/lib/utils";
import InviteFriendButton from "./InviteFriendButton";

const InviteFriendModal = () => {
  const { isOpen, onClose, isLoading, users, removeUsers } =
    useInviteFriendModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[600px] !px-7 bg-layout py-7 !rounded-3xl gap-0"
    >
      <DialogHeader className="sm:text-center w-full px-9 mb-4 tracking-wider text-2xl font-bold text-center">
        Invite more friends to this event
      </DialogHeader>
      <Separator className="bg-primary w-full mb-4" />
      <div
        className={cn(
          "max-h-[calc(100vh-180px)] min-h-[300px] overflow-y-auto",
          {
            "center ": isLoading || users.length === 0,
          }
        )}
      >
        {isLoading ? (
          <ImSpinner8 className="text-4xl animate-spin" />
        ) : (
          <>
            {users.length === 0 ? (
              <div className="text-2xl text-center">
                Sorry we {"can't"} find user for you to invite 😭
              </div>
            ) : (
              <>
                {users.map((user, index) => {
                  return <InviteFriendButton user={user} key={index} />;
                })}
              </>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default InviteFriendModal;
