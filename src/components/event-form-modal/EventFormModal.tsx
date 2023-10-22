import { useEventFormModal } from "@/hooks/useEventFormModal";
import Modal from "../modals/Modal";
import { DialogHeader } from "../ui/dialog";

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
      className="max-w-[900px] bg-layout pt-7 pb-7 px-9 !rounded-3xl remove-button"
    >
      <DialogHeader className="text-center">
        Creating your own event
      </DialogHeader>
    </Modal>
  );
};

export default EventFormModal;
