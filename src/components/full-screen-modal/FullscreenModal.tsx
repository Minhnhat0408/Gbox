"use client";

import { useFullscreenModal } from "@/hooks/useFullscreenModal";
import Modal from "../modals/Modal";
import Image from "next/image";


const FullscreenModal = () => {
  const { onClose, onOpen, isOpen, src } = useFullscreenModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };


  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="remove-button bg-transparent !min-w-screen !p-0  border-transparent focus:border-transparent focus:ring-transparent   flex justify-center items-center h-fit"
    >
      <Image

        src={src}
        alt={"fullscreen image"}
        height={0}
        width={0}
        sizes="100vw"
        className={
          "h-[80vh] w-auto min-w-max object-cover  object-center select-none"
        }
      />
    </Modal>
  );
};

export default FullscreenModal;
