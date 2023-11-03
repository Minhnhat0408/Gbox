"use client";

import EventFormModal from "@/components/event-form-modal/EventFormModal";
import InformationModal from "@/components/information-modal/InformationModal";
import PostFormModal from "@/components/post-form-modal/PostFormModal";
import UpdateGameModal from "@/components/update-game-modal/UpdateGameModal";
import { useEffect, useState } from "react";

function ModalProviders() {
  // Prevent modal open when SSR
  const [isMounted, setisMounted] = useState<boolean>(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <InformationModal />
      <UpdateGameModal />
      <PostFormModal />
      <EventFormModal />
    </>
  );
}

export default ModalProviders;
