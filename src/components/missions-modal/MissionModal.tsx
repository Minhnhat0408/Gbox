import { useMissionsModal } from "@/hooks/useMissionsModal";
import Modal from "../modals/Modal";
import { DialogHeader } from "../ui/dialog";

const MissionModal = () => {
  const { isOpen, onClose } = useMissionsModal();

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
      <DialogHeader className="sm:text-center w-full px-9 mb-4 tracking-wider text-2xl font-bold text-center">
        Daily Missions
      </DialogHeader>
    </Modal>
  );
};

export default MissionModal;
