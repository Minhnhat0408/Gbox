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
    total_people,
    event_name,
    user_id,
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

    const { data: totalMember, error: queryError } = await supabaseClient
      .from("event_participations")
      .select("*, profiles(*)")
      .eq("event_id", id)
      .neq("participation_id", user_id);

    if (queryError) {
      setParticipate(false);
      setLoading(false);
      return toast.error(queryError.message);
    }

    setMembers([...totalMember]);

    if (
      total_people !== "no-limit" &&
      totalMember.length + 1 === parseInt(total_people!)
    ) {
      setLoading(false);
      setParticipate(false);
      return toast.error("Sorry, this event is full for now 😞");
    }

    const addToEvent = supabaseClient.from("event_participations").insert({
      participation_id: userDetails.id,
      event_id: id,
    });

    const checkNotification = supabaseClient
      .from("notifications")
      .select("*")
      .eq("notification_type", "event_notify")
      .eq("link_to", `/events/${id}`);

    const [addToEventRes, checkNotificationRes] = await Promise.all([
      addToEvent,
      checkNotification,
    ]);

    if (addToEventRes.error) {
      setLoading(false);
      setParticipate(false);
      return toast.error(addToEventRes.error.message);
    }

    if (checkNotificationRes.error) {
      return toast.error(checkNotificationRes.error.message);
    }
    setMembers([
      {
        ...userDetails,
        event_id: id,
        joined_date: new Date().toISOString(),
        participation_id: userDetails.id,
        profiles: userDetails,
      },
      ...totalMember,
    ]);
    setParticipate(true);
    setLoading(false);
    toast.success("Welcome to the event ! 😁");
    onClose();

    // create notification for host
    if (checkNotificationRes.data.length < 5) {
      // check if user already in the notification with the id
      const isInNotification = checkNotificationRes.data.find(
        (item) => item.sender_id === userDetails.id
      );

      if (isInNotification) {
        const { data, error } = await supabaseClient
          .from("notifications")
          .upsert({
            id: `${userDetails?.id}-${id}-event_notify`,
            created_at: new Date(),
          });

        if (error) {
          console.log("Error update notification: ", error.message);
        }
        return;
      }

      const { data, error } = await supabaseClient
        .from("notifications")
        .insert({
          id: `${userDetails?.id}-${id}-event_notify`,
          created_at: new Date(),
          content: `${userDetails.name} has joined your "${event_name}" event`,
          sender_id: userDetails?.id,
          receiver_id: user_id,
          link_to: `/events/${id}`,
          notification_type: "event_notify",
          notification_meta_data: {
            event_id: id,
            sender_avatar: userDetails?.avatar,
            sender_name: userDetails?.name,
          },
        });

      if (error) {
        console.log("Error create notification: ", error.message);
      }
    } else {
      const { data, error } = await supabaseClient
        .from("notifications")
        .upsert({
          id: `${user_id}-${id}-event_group_notify`,
          created_at: new Date(),
          content: `${userDetails.name} and other ${totalMember.length} people has joined your "${event_name}" event`,
          sender_id: userDetails?.id,
          link_to: `/events/${id}`,
          notification_type: "event_notify",
          notification_meta_data: {
            event_id: id,
            sender_avatar: userDetails?.avatar,
            sender_name: userDetails?.name,
          },
        });
    }
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
