import { useEventFormModal } from "@/hooks/useEventFormModal";
import Modal from "../modals/Modal";
import { DialogHeader } from "../ui/dialog";
import EventFormBody from "./EventFormBody";
import { Separator } from "../ui/separator";

const EventFormModal = () => {
  const { isOpen, onClose } = useEventFormModal((set) => set);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[600px] bg-layout pt-7 pb-7 !px-0 !rounded-3xl gap-0"
    >
      <DialogHeader className="sm:text-center w-full px-9 mb-4 text-2xl font-bold text-center">
        Creating your own event
      </DialogHeader>
      <Separator className="bg-primary w-full " />
      <EventFormBody />
    </Modal>
  );
};

export default EventFormModal;
