"use client";

import { useAppointmentInformationModal } from "@/hooks/useAppointmentInformationModal";
import Modal from "../modals/Modal";

const AppointmentInformationModal = () => {
  const { isOpen, onClose } = useAppointmentInformationModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      className="max-w-[800px] max-h-[900px] overflow-x-visible bg-background pt-10 pb-12 pr-0 pl-9 !rounded-2xl remove-button"
      isOpen={isOpen}
      onChange={onChange}
    >
      1
    </Modal>
  );
};

export default AppointmentInformationModal;
