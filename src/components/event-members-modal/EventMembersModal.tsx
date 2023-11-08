import Modal from "../modals/Modal";
import { DialogHeader } from "../ui/dialog";
import { useEventMemberModal } from "@/hooks/useEventMemberModal";
import { Separator } from "../ui/separator";
import EventMember from "./EventMember";
import { useEventDetail } from "@/hooks/useEventDetail";

const EventMemberModal = () => {
  const { isOpen, onClose, members } = useEventMemberModal();

  const { profiles: event_owner } = useEventDetail();

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
      <DialogHeader className="sm:text-center w-full px-9 mb-4 text-2xl font-bold text-center">
        Event Members Lists
      </DialogHeader>
      <Separator className="bg-primary w-full mb-4" />
      <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
        <EventMember
          id={event_owner.id}
          index={-1}
          avatar={event_owner.avatar}
          name={event_owner.name}
        />
        {members.length > 0 &&
          members.map((e, index) => (
            <EventMember
              id={e.profiles.id}
              key={index}
              index={index}
              avatar={e.profiles.avatar}
              joined_date={e.joined_date}
              name={e.profiles.name}
            />
          ))}
      </div>
    </Modal>
  );
};

export default EventMemberModal;
