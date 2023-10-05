"use client";

import { Button } from "@/components/ui/button";
import useInformationModal from "@/hooks/useInformationModal";


export default function Home() {
  const { onClose, onOpen } = useInformationModal();

  return (
    <main className="bg-home flex flex-col items-center justify-between w-full min-h-screen p-24 bg-white">
      <Button onClick={onOpen}>Open Modal</Button>
    </main>
  );
}
