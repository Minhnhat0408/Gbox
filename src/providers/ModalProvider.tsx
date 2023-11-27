"use client";

import EventFormModal from "@/components/event-form-modal/EventFormModal";
import FullscreenModal from "@/components/full-screen-modal/FullscreenModal";
import InformationModal from "@/components/information-modal/InformationModal";
import EditGameLibraryPageModal from "@/components/library-page/edit-game-library-modal/EditGameLibraryModal";
import GameLibInformationModal from "@/components/library-page/game-lib-information-modal/GameLibInformationModal";
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
      <EditGameLibraryPageModal />
      <GameLibInformationModal />
    </>
  );
}

export default ModalProviders;
