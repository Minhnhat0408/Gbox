"use client";

import { Button } from "@/components/ui/button";
import useInformationModal from "@/hooks/useInformationModal";

export default function Home() {
  const { onClose, onOpen } = useInformationModal();

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <Button onClick={onOpen}>Open Modal</Button>
    </main>
  );
}
