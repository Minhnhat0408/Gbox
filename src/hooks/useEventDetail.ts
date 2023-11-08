import { eventDetailContext } from "@/providers/EventDetailProvider";
import { useContext } from "react";

export const useEventDetail = () => {
  const context = useContext(eventDetailContext);
  if (context === undefined) {
    throw new Error("useEventDetail must be used within a EventDetailProvider");
  }
  return {
    ...context,
  };
};
