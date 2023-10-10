import { usePostFormModal } from "@/hooks/usePostFormModal";
import Modal from "../modals/Modal";
import { DialogHeader, DialogTitle } from "../ui/dialog";

function PostFormModal() {
  const { isOpen, onClose } = usePostFormModal((set) => set);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[700px] bg-layout pt-7 pb-10 px-9 !rounded-3xl remove-button"
    >
      <DialogHeader>
        <DialogTitle className="mb-4 text-xl font-normal text-center capitalize">
          Post your game review / experience
        </DialogTitle>
      </DialogHeader>
    </Modal>
  );
}

export default PostFormModal;
