import { coachDetailContext } from "@/providers/CoachProfileProvider";
import { useContext } from "react";

export const useCoachProfile = () => {
  const context = useContext(coachDetailContext);
  if (context === undefined) {
    throw new Error(
      "useCoachDetail must be used within a CoachProfileProvider"
    );
  }
  return {
    ...context,
  };
};
