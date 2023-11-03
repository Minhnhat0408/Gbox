"use client";

import { EventReturnType } from "@/types/supabaseTableType";
import { createContext, useContext, useState } from "react";

export const eventDetailContext = createContext<
  | (EventReturnType & {
      isPariticpated: boolean;
      setParticipate: React.Dispatch<React.SetStateAction<boolean>>;
      isHost: boolean;
      loading: boolean;
      setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    })
  | undefined
>(undefined);

export const EventDetailProvider = ({
  data,
  isParticipate,
  isHost,
  children,
}: {
  data: EventReturnType;
  isParticipate: boolean;
  isHost: boolean;
  children: React.ReactNode;
}) => {
  const [participate, setParticipate] = useState(isParticipate);
  const [loading, setLoading] = useState(false);

  return (
    <eventDetailContext.Provider
      value={{
        ...data,
        isHost: isHost,
        isPariticpated: participate,
        loading: loading,
        setLoading: setLoading,
        setParticipate,
      }}
    >
      {children}
    </eventDetailContext.Provider>
  );
};
