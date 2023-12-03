"use client";

import { ProfilesType } from "@/types/supabaseTableType";
import { createContext } from "react";

export const profileDetailContext = createContext<
  | {
      profile: ProfilesType;
      isOwner: boolean;
    }
  | undefined
>(undefined);

export const ProfileDetailProvider = ({
  data,
  isOwner,
  children,
}: {
  data: ProfilesType;
  isOwner: boolean;
  children: React.ReactNode;
}) => {
  return (
    <profileDetailContext.Provider value={{ profile: { ...data }, isOwner }}>
      {children}
    </profileDetailContext.Provider>
  );
};
