"use client";

import useUpdateGameModal from "@/hooks/useUpdateGameModal";
import Modal from "../modals/Modal";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Command, CommandInput } from "../ui/command";
import { FiSearch } from "react-icons/fi";

function UpdateGameModal() {
  const { isOpen, onOpen, onClose } = useUpdateGameModal();

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
          Update your game
        </DialogTitle>
      </DialogHeader>
      <div className="rounded-xl flex items-center w-full h-16 px-6 py-2 bg-gray-800">
        <FiSearch className="mr-4 text-2xl text-gray-400" />
        <input
          className="focus-visible:outline-none placeholder:text-gray-400 w-full h-8 pr-4 text-lg bg-gray-800"
          placeholder="Search anything..."
        />
      </div>
      <div className="custom-scroll-bar overflow-y-auto"></div>
    </Modal>
  );
}

export default UpdateGameModal;
