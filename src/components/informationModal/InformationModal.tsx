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
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { ProfilesType } from "@/types/supabaseTableType";
import PlayTimeForm from "./PlayTimeForm";

function InformationModal() {
  const { formType } = useInformationModal();
  const [atHome, setAtHome] = useState<boolean>(false);

  const pathName = usePathname();
  const { supabaseClient } = useSessionContext();
  const user = useUser();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data, error } = (await supabaseClient
          .from("profiles")
          .select("*")
          .eq("id", user?.id)
          .single()) as { data: ProfilesType; error: any };
        if (data) {
          console.log(data);
        }

        return data;
      } catch (error) {
        console.log(error);
      }
    };

    if (pathName === "/") {
      setAtHome(true);
      if (user) {
        getUserInfo();
      }
    }
  }, [pathName]);

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
