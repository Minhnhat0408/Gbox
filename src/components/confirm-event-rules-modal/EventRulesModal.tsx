import { useConfirmRulesModal } from "@/hooks/useConfirmRulesModal";
import Modal from "../modals/Modal";
import { DialogHeader } from "../ui/dialog";
import { useEventDetail } from "@/hooks/useEventDetail";
import { useEventMemberModal } from "@/hooks/useEventMemberModal";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ImSpinner8 } from "react-icons/im";

export const EventRulesModal = () => {
  const { isOpen, onClose } = useConfirmRulesModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const {
    id,
    event_participations,
    setParticipate,
    loading,
    setLoading,
    rules,
    start_date,
  } = useEventDetail();

  const { setMembers } = useEventMemberModal();

  const { supabaseClient } = useSessionContext();

  const { userDetails } = useUser();

  const handleJoinEvent = async () => {
    if (!userDetails) return;
    if (start_date) {
      const endDate = new Date(start_date);
      const currentDate = new Date();
      if (currentDate > endDate) {
        return toast.error("Sorry, this event has ended 😞");
      }
    }
    setLoading(true);
    setParticipate(false);
    const { data, error } = await supabaseClient
      .from("event_participations")
      .insert({
        participation_id: userDetails.id,
        event_id: id,
      });
    if (error) {
      setLoading(false);
      setParticipate(false);
      return toast.error(error.message);
    }
    setMembers([
      {
        ...userDetails,
        event_id: id,
        joined_date: new Date().toISOString(),
        participation_id: userDetails.id,
        profiles: userDetails,
      },
      ...event_participations,
    ]);
    setParticipate(true);
    setLoading(false);
    toast.success("Welcome to the event ! 😁");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[530px] !px-10 bg-layout py-7 !rounded-3xl gap-0"
    >
      <DialogHeader className="sm:text-center w-full px-9 tracking-wider text-2xl super font-bold text-center">
        Event rules
      </DialogHeader>
      <div className="w-full text-center mb-5 mt-2 font-bold text-white">
        Please read these rules before join event
      </div>
      <div className="max-h-[calc(100vh-300px)] my-4 overflow-y-auto space-y-3">
        {rules?.map((rule, index) => (
          <div className="flex" key={index}>
            <div className="mr-2 w-[30px] text-gray-400">{index + 1}.</div>
            <span className="">{rule}</span>
          </div>
        ))}
      </div>
      <div className="w-full justify-end flex items-center mt-4">
        <Button
          onClick={() => {
            onClose();
          }}
          variant={"outline"}
        >
          Cancel
        </Button>
        <Button onClick={handleJoinEvent} className="ml-3">
          Join Event
          {loading && <ImSpinner8 className="ml-2 animate-spin text-lg" />}
        </Button>
      </div>
    </Modal>
  );
};
