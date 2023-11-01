"use client";

import { EventReturnType } from "@/types/supabaseTableType";
import { createContext, useContext } from "react";

export const eventDetailContext = createContext<EventReturnType | undefined>(
  undefined
);

export const EventDetailProvider = ({
  data,
  children,
}: {
  data: EventReturnType;
  children: React.ReactNode;
}) => {
  return (
    <eventDetailContext.Provider value={data}>
      {children}
    </eventDetailContext.Provider>
  );
};
