import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useInviteFriendGroupChatModal } from "@/hooks/useInviteFriendGroupChatModal";
import Modal from "../modals/Modal";
import { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";

import GroupMemberItem from "./group-member-item";
import useGroupMembers from "@/hooks/useGroupMembers";

const GroupMembersModal = () => {
  const { isOpen, onClose, members, setMembers, currentMember } =
    useGroupMembers();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const { supabaseClient } = useSessionContext();

  const { userDetails } = useUser();

  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       if (!supabaseClient || !isOpen || !userDetails?.id || !inviteID)
  //         return null;

  //       try {
  //         setLoading(true);
  //         const { data, error } = await supabaseClient.rpc("get_list_friends", {
  //           user_id: userDetails?.id,
  //         });

  //         if (error) throw error;

  //         const newData = data.map((item: ProfilesType) => {
  //           return {
  //             data: item,
  //             selected: item.id === inviteID ? true : false,
  //           };
  //         });

  //         setPeopleList(newData);
  //         setLoading(false);
  //       } catch (error: any) {
  //         toast.error(error.message);
  //         setLoading(false);
  //       }
  //     };
  //     if (peopleList.length === 0) {
  //       fetchUsers();
  //     }
  //   }, [supabaseClient, isOpen, userDetails]);

  //   if (!inviteID) return null;

  return (
    <Modal
      className="max-w-[600px] remove-button h-[600px] overflow-y-auto !px-7 bg-layout py-7 !rounded-3xl gap-0"
      onChange={onChange}
      isOpen={isOpen}
    >
      <div className="flex w-full flex-col">
        <h1 className="super font-bold text-2xl text-center w-full">
          Group Members
        </h1>
        <div className="w-full h-full flex mt-8 flex-col gap-y-3">
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
      </div>
    </Modal>
  );
};

export default GroupMembersModal;
