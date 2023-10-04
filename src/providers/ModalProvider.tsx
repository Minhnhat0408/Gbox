"use client";

import InformationModal from "@/components/informationModal/InformationModal";
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
    </>
  );
}

export default ModalProviders;
