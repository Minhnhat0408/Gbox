import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useInviteFriendGroupChatModal } from "@/hooks/useInviteFriendGroupChatModal";
import Modal from "../modals/Modal";
import { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { useCreateGroupChatModal } from "@/hooks/useCreateGroupChatModal";
import { ProfilesType } from "@/types/supabaseTableType";
import Image from "next/image";
import { DialogHeader } from "../ui/dialog";

const InviteGroupChatModal = () => {
  const {
    isOpen,
    onClose,
    setPeopleList,
    peopleList,
    setLoading,
    loading,
    checkPeople,
    unCheckPeople,
  } = useInviteFriendGroupChatModal();

  const { inviteID } = useCreateGroupChatModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const { supabaseClient } = useSessionContext();

  const { userDetails } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!supabaseClient || !isOpen || !userDetails?.id || !inviteID)
        return null;

      try {
        setLoading(true);
        const { data, error } = await supabaseClient.rpc("get_list_friends", {
          user_id: userDetails?.id,
        });

        if (error) throw error;

        const newData = data.map((item: ProfilesType) => {
          return {
            data: item,
            selected: item.id === inviteID ? true : false,
          };
        });

        setPeopleList(newData);
        setLoading(false);
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      }
    };
    if (peopleList.length === 0) {
      fetchUsers();
    }
  }, [supabaseClient, isOpen, userDetails]);

  if (!inviteID) return null;

  return (
    <Modal
      className="max-w-[600px] remove-button h-[80vh] flex-col flex !px-7 bg-layout py-7 !rounded-3xl gap-0"
      onChange={onChange}
      isOpen={isOpen}
    >
      <DialogHeader className="super font-bold text-3xl text-center w-full">
        Invite Friends
      </DialogHeader>
      {loading && (
        <div className="w-full h-full center">
          <AiOutlineLoading3Quarters className="animate-spin h-10 w-10" />
        </div>
      )}
      {!loading && (
        <div className="w-full h-full flex mt-8 flex-col overflow-y-scroll flex-1 gap-y-3 scrollbar">
          {peopleList.length === 0 ? (
            <div className="text-lg">No Friends 🥹</div>
          ) : (
            <>
              {peopleList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full select-none p-4 flex justify-between items-center"
                  >
                    <div className="flex gap-x-4">
                      <Image
                        src={item.data.avatar || "/avatar.jpg"}
                        alt=""
                        className="w-16 h-16 rounded-full"
                        width={0}
                        height={0}
                        sizes="100vw"
                      />
                      <div className="flex flex-col justify-center gap-y-2">
                        <div className="font-bold">{item.data.name}</div>
                        <div className="text-zinc-400 text-sm">friends</div>
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        if (item.selected) {
                          unCheckPeople(index);
                        } else {
                          checkPeople(index);
                        }
                      }}
                      className="w-8 rounded-lg bg-background border-primary border-2 h-8 center"
                    >
                      {item.selected && (
                        <div className="text-2xl text-primary">
                          <AiOutlineCheck />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </Modal>
  );
};

export default InviteGroupChatModal;
