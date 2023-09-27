import useInformationModal from "@/hooks/useInformationModal";
import Modal from "../modals/Modal";

function InformationModal() {
  const { onClose, isOpen } = useInformationModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal onChange={onChange} isOpen={isOpen}>
      {/* TODO: using all components in the shadcn UI to extend the theme */}
      <div className="w-40 h-40 text-4xl text-green-600 bg-gray-400">
        Information Modal
      </div>
    </Modal>
  );
}

export default InformationModal;
