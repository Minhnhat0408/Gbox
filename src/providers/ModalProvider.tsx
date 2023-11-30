"use client";

import EventFormModal from "@/components/event-form-modal/EventFormModal";
import FullscreenModal from "@/components/full-screen-modal/FullscreenModal";
import CreateRoomModal from "@/components/game-rooms-ui/create-room-modal";
import MatchingOptionsModal from "@/components/game-rooms-ui/matching-options-modal";
import RoomLobbyModal from "@/components/room-lobby/room-lobby-modal";
import InformationModal from "@/components/information-modal/InformationModal";
import PostFormModal from "@/components/post-form-modal/PostFormModal";
import PostDetailsModal from "@/components/post-ui/post-details-modal";
import UpdateGameModal from "@/components/update-game-modal/UpdateGameModal";
import { useEffect, useState } from "react";
import MatchingRoomModal from "@/components/matching-room-ui/matching-room-modal";
import RoomInviteModal from "@/components/matching-room-ui/room-invite-modal";

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
      {/* TODO: add another modal here */}
      <PostDetailsModal />
      <UpdateGameModal />
      <PostFormModal />
      <FullscreenModal />
      <EventFormModal />
      <MatchingOptionsModal />
      <CreateRoomModal />
      <RoomLobbyModal />
      <MatchingRoomModal />
      <RoomInviteModal />
    </>
  );
}

export default ModalProviders;
