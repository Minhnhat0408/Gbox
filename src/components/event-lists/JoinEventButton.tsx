"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { IoGameControllerSharp } from "react-icons/io5";

export default function JoinEventButton({ eventID }: { eventID: string }) {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push(`/events/${eventID}`);
      }}
      className="transition opacity-0 group-hover:opacity-100 shine-2 hover:bg-[#89f7fe] bg-[#00d9f5]"
    >
      <IoGameControllerSharp className="mr-2 text-xl" />
      Join Event
    </Button>
  );
}
