import { profileDetailContext } from "@/providers/ProfileDetailProvider";
import { useContext } from "react";

export const useProfileDetail = () => {
  const context = useContext(profileDetailContext);
  if (context === undefined) {
    throw new Error(
      " useProfileDetail must be used within a ProfileDetailProvider"
    );
  }
  return {
    ...context,
  };
};
