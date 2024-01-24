"use client";

import { useEventFormModal } from "@/hooks/useEventFormModal";
import { Button } from "../ui/button";

const CreateEventButton = () => {
  const { onOpen, setFormType } = useEventFormModal();

  return (
    <Button
      onClick={() => {
        onOpen();
        setFormType("create");
      }}
      className="shine hover:bg-[#0cebeb] bg-[#29ffc6]"
    >
      Create Events
    </Button>
  );
};

export default CreateEventButton;
