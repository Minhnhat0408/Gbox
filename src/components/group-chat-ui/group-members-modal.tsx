import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useInviteFriendGroupChatModal } from "@/hooks/useInviteFriendGroupChatModal";
import Modal from "../modals/Modal";
import { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";

import GroupMemberItem from "./group-member-item";
import useGroupMembers from "@/hooks/useGroupMembers";
import { DialogHeader } from "../ui/dialog";
import { Separator } from "../ui/separator";

const GroupMembersModal = () => {
  const { isOpen, onClose, members, setMembers, currentMember } =
    useGroupMembers();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      className="max-w-[600px] remove-button h-[80vh]  !px-7 flex flex-col bg-layout py-7 !rounded-3xl gap-0"
      onChange={onChange}
      isOpen={isOpen}
    >
      <DialogHeader className="super font-bold text-3xl text-center w-full pb-4">
        Group Members
      </DialogHeader>
      <Separator className="bg-primary h-[1px] w-full " />
      <div className="w-full h-full flex mt-4 flex-col overflow-y-scroll scrollbar gap-y-3 flex-1">
        {members.length === 0 ? (
          <div className="text-lg">No Members 🥹</div>
        ) : (
          <>
            {members.map((item, index) => {
              return <GroupMemberItem member={item} key={index} />;
            })}
          </>
        )}
      </div>
    </Modal>
  );
};

export default GroupMembersModal;
