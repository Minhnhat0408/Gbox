import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";

import Modal from "../modals/Modal";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { ProfilesType } from "@/types/supabaseTableType";
import Image from "next/image";
import useGroupAddMembers from "@/hooks/useGroupAddMembers";
import useGroupMembers from "@/hooks/useGroupMembers";
import useGroupChatBox from "@/hooks/useGroupChatBox";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "../ui/button";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Separator } from "../ui/separator";

const GroupAddMembersModal = () => {
  const {
    isOpen,
    onClose,
    // setPeopleList,
    // peopleList,
    // setLoading,
    // loading,
    // checkPeople,
    // unCheckPeople,
  } = useGroupAddMembers();
  const { members, setMembers } = useGroupMembers();
  const [loading, setLoading] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const { currentGroup } = useGroupChatBox();

  const [peopleList, setPeopleList] = useState<
    { data: ProfilesType; selected: boolean }[]
  >([]);
  const { supabaseClient } = useSessionContext();

  const { userDetails } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!userDetails?.id) return null;

      try {
        setLoading(true);
        const { data, error } = await supabaseClient.rpc("get_list_friends", {
          user_id: userDetails?.id,
        });

        if (error) throw error;
        //filter out all the current room member
        const newData = data
          .filter((item: ProfilesType) => {
            return !members.find((member) => member.user_id === item.id);
          })
          .map((item: ProfilesType) => {
            return {
              data: item,
              selected: false,
            };
          });

        setPeopleList(newData);
        setLoading(false);
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentGroup, isOpen]);

  const checkPeople = (index: number) => {
    const newData = [...peopleList];
    newData[index].selected = true;
    setPeopleList(newData);
  };
  const unCheckPeople = (index: number) => {
    const newData = [...peopleList];
    newData[index].selected = false;
    setPeopleList(newData);
  };

  const handleInvite = async () => {
    if (!supabaseClient || !userDetails?.id || !currentGroup) return null;
    const selectedPeople = peopleList.filter((item) => item.selected);
    if (selectedPeople.length === 0) {
      toast.error("Please select at least one friend !!");
      return;
    }
    try {
      setIsInviting(true);
      const { data, error } = await supabaseClient
        .from("group_users")
        .insert(
          selectedPeople.map((item) => {
            return {
              user_id: item.data.id,
              group_id: currentGroup?.id,
              role: "member",
            };
          })
        )
        .select("*,profiles(name,avatar,id)");

      let date = new Date();
      await supabaseClient.from("messages").insert([
        ...selectedPeople.map((item, ind) => {
          let newDate = date;
          newDate.setTime(date.getTime() + (ind + 1) * 500);
          return {
            content: `${item.data.name} have joined the group`,
            created_at: newDate,
            group_id: currentGroup.id,
          };
        }),
      ]);

      if (error) throw error;
      //add the new mambers to the members list
      setMembers([...members, ...data]);
      toast.success("Invite success !!");
      //reset the people list
      setPeopleList([]);

      setIsInviting(false);
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <Modal
      className="max-w-[600px] remove-button h-[80vh]  !px-7 bg-layout py-7 flex flex-col  !rounded-3xl gap-0"
      onChange={onChange}
      isOpen={isOpen}
    >
      <DialogHeader className="super font-bold text-3xl text-center w-full pb-4">
        Invite Friends to Group
      </DialogHeader>
      <Separator className="bg-primary h-[1px] w-full " />
      {loading && (
        <div className="w-full h-full center">
          <AiOutlineLoading3Quarters className="animate-spin h-10 w-10" />
        </div>
      )}
      {!loading && (
        <div className="w-full h-full  mt-4 flex-1 overflow-y-scroll scrollbar gap-y-3">
          {peopleList.length === 0 ? (
            <div className="text-lg text-center">No other Friends 🥹</div>
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
      <DialogFooter className="flex px-5 mt-auto pt-5 justify-center items-center w-full ">
        <Button
          disabled={isInviting || loading}
          className="w-full relative"
          onClick={handleInvite}
        >
          Invite
          {isInviting && (
            <ImSpinner2 className="animate-spin text-2xl absolute right-3" />
          )}
        </Button>
      </DialogFooter>
    </Modal>
  );
};

export default GroupAddMembersModal;
