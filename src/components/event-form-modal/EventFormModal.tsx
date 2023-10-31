import { useEventFormModal } from "@/hooks/useEventFormModal";
import Modal from "../modals/Modal";
import { DialogHeader } from "../ui/dialog";
import EventFormBody from "./EventFormBody";
import { Separator } from "../ui/separator";
import { useEventMoreInformation } from "@/hooks/useEventMoreInformation";
import { useEventFormBodyModal } from "@/hooks/useEventFormBody";

const EventFormModal = () => {
  const { isOpen, onClose } = useEventFormModal((set) => set);

  const { resetAll } = useEventMoreInformation();

  const { reset } = useEventFormBodyModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
      resetAll();
      reset();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[600px] bg-layout pt-7 pb-16 !px-0 !rounded-3xl gap-0"
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
