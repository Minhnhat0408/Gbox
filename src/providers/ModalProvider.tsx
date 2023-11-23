"use client";

import EventFormModal from "@/components/event-form-modal/EventFormModal";
import FullscreenModal from "@/components/full-screen-modal/FullscreenModal";
import GameLibInformationModal from "@/components/game-lib-information-modal/GameLibInformationModal";
import InformationModal from "@/components/information-modal/InformationModal";
import PostFormModal from "@/components/post-form-modal/PostFormModal";
import PostDetailsModal from "@/components/post-ui/post-details-modal";
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
      <PostDetailsModal />
      <UpdateGameModal />
      <PostFormModal />
      <FullscreenModal />
      <EventFormModal />
      <GameLibInformationModal />
    </>
  );
}

export default ModalProviders;
