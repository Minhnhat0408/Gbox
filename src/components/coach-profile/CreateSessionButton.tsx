"use client";

import { MdAddToPhotos } from "react-icons/md";
import { Button } from "../ui/button";
import { useCreateCoachSessionModal } from "@/hooks/useCreateCoachSessionModal";

const CreateSessionButton = () => {
  const { onOpen } = useCreateCoachSessionModal();

  return (
    <Button
      onClick={() => {
        onOpen();
      }}
      className="flex items-center flex-1"
      variant={"outline"}
    >
      <MdAddToPhotos className="mr-3 text-xl" />
      Create Session
    </Button>
  );
};

export default CreateSessionButton;
