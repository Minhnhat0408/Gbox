"use client";

import { CoachDataWithProfile } from "@/types/supabaseTableType";
import { createContext } from "react";

export const coachDetailContext = createContext<
  | {
      data: CoachDataWithProfile;
    }
  | undefined
>(undefined);

export const CoachProfileProvider = ({
  data,
  children,
}: {
  data: CoachDataWithProfile;
  children: React.ReactNode;
}) => {
  return (
    <coachDetailContext.Provider value={{ data: { ...data } }}>
      {children}
    </coachDetailContext.Provider>
  );
};
