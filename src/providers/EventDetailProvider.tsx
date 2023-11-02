"use client";

import { EventReturnType } from "@/types/supabaseTableType";
import { createContext, useContext, useState } from "react";

export const eventDetailContext = createContext<
  | (EventReturnType & {
      isPariticpated: boolean;
      setParticipate: React.Dispatch<React.SetStateAction<boolean>>;
    })
  | undefined
>(undefined);

export const EventDetailProvider = ({
  data,
  isParticipate,
  children,
}: {
  data: EventReturnType;
  isParticipate: boolean;
  children: React.ReactNode;
}) => {
  const [participate, setParticipate] = useState(isParticipate);

  return (
    <eventDetailContext.Provider
      value={{
        ...data,
        isPariticpated: participate,
        setParticipate,
      }}
    >
      {children}
    </eventDetailContext.Provider>
  );
};
