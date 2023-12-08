"use client";

import EventFormModal from "@/components/event-form-modal/EventFormModal";
import FullscreenModal from "@/components/full-screen-modal/FullscreenModal";
import CreateRoomModal from "@/components/game-rooms-ui/create-room-modal";
import MatchingOptionsModal from "@/components/game-rooms-ui/matching-options-modal";
import RoomLobbyModal from "@/components/room-lobby/room-lobby-modal";
import InformationModal from "@/components/information-modal/InformationModal";
import EditGameLibraryPageModal from "@/components/library-page/edit-game-library-modal/EditGameLibraryModal";
import GameLibInformationModal from "@/components/library-page/game-lib-information-modal/GameLibInformationModal";
import PostFormModal from "@/components/post-form-modal/PostFormModal";
import PostDetailsModal from "@/components/post-ui/post-details-modal";
import UpdateGameModal from "@/components/update-game-modal/UpdateGameModal";
import { useEffect, useState } from "react";
import MatchingRoomModal from "@/components/matching-room-ui/matching-room-modal";
import RoomInviteModal from "@/components/room-invite/room-invite-modal";
import CongratulationsModal from "@/components/matching-room-ui/congratulations-modal";
import CreateGroupChatModal from "@/components/create-group-chat/create-group-chat-modal";
import InviteGroupChatModal from "@/components/invite-group-chat-modal/InviteGroupChatModal";

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
      <MatchingOptionsModal />
      <CreateRoomModal />
      <RoomLobbyModal />
      <MatchingRoomModal />
      <RoomInviteModal />
      <CongratulationsModal />
      <CreateGroupChatModal />
      <InviteGroupChatModal />
    </>
  );
}

export default ModalProviders;
