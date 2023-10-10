"use client";

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
      {/* TODO: add another modal here */}
      <UpdateGameModal />
      <PostFormModal />
    </>
  );
}

export default ModalProviders;
