"use client";

import useInformationModal from "@/hooks/useInformationModal";
import Modal from "../modals/Modal";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import UserForm from "./UserForm";
import PersonalForm from "./PersonalForm";
import GamingForm from "./GamingForm";
import { AnimatePresence } from "framer-motion";
// type;

function InformationModal() {
  const { formType } = useInformationModal();
  const [atHome, setAtHome] = useState<boolean>(false);

  const pathName = usePathname();

  useEffect(() => {
    if (pathName === "/") {
      setAtHome(true);
    }
  }, [pathName]);

  return (
    <Modal
      className="max-w-[700px] bg-home py-10 px-9 remove-button"
      onChange={() => {}}
      isOpen={atHome ? true : false}
    >
      <AnimatePresence>
        {formType === "user-form" && <UserForm />}
        {formType === "information-form" && <PersonalForm />}
        {formType === "gaming-form" && <GamingForm />}
      </AnimatePresence>
    </Modal>
  );
}

export default InformationModal;
