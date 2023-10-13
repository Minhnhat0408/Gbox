"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import useInformationModal from "@/hooks/useInformationModal";
import Modal from "../modals/Modal";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import UserForm from "./UserForm";
import PersonalForm from "./PersonalForm";
import PlatformForm from "./PlatformForm";
import { AnimatePresence } from "framer-motion";
import PlayedGameForm from "./PlayedGameForm";
import PlayTimeForm from "./PlayTimeForm";
import { useUser } from "@/hooks/useUser";

export const alertUser = (e: any) => {
  e.preventDefault();
  e.returnValue = "Are you sure want to leave, the progress will be lost";
  return e.returnValue;
};

function InformationModal() {
  const { formType } = useInformationModal();
  const [atHome, setAtHome] = useState<boolean>(false);

  const pathName = usePathname();

  const { user, isLoading, userDetails } = useUser();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (!user || !userDetails) return null;
        if (
          userDetails?.avatar &&
          userDetails?.dob &&
          userDetails?.name &&
          userDetails?.gender &&
          userDetails?.location &&
          userDetails?.gaming_platform &&
          userDetails?.play_time &&
          userDetails?.bio
        ) {
          setAtHome(false);
        } else {
          window.addEventListener("beforeunload", alertUser);
          setAtHome(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (pathName === "/sign-in" || pathName === "/sign-up")
      return setAtHome(false);
    getUserInfo();
  }, [pathName, isLoading, userDetails]);

  return atHome ? (
    <Modal
      className="max-w-[700px] bg-home py-10 px-9 remove-button"
      onChange={() => {}}
      isOpen={atHome ? true : false}
    >
      <AnimatePresence>
        {formType === "user-form" && <UserForm />}
        {formType === "information-form" && <PersonalForm />}
        {formType === "gaming-form" && <PlatformForm />}
        {formType === "played-form" && <PlayedGameForm />}
        {formType === "playtime-form" && <PlayTimeForm />}
      </AnimatePresence>
    </Modal>
  ) : (
    <></>
  );
}

export default InformationModal;
