"use client";

import { useFullscreenModal } from "@/hooks/useFullscreenModal";
import Modal from "../modals/Modal";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";

const FullscreenModal = () => {
  const { onClose, onOpen, isOpen, src } = useFullscreenModal();
  const [modify, setModify] = useState(false);
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const ref = useRef(null);
  useEffect(() => {
    if (ref && ref.current) {
      console.log(ref.current);
    }
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="remove-button bg-transparent !min-w-screen !p-0  border-transparent focus:border-transparent focus:ring-transparent   flex justify-center items-center h-fit"
    >
      <Image
        ref={ref}
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
