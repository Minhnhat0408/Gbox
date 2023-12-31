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
      setViewMode: React.Dispatch<
        React.SetStateAction<"detail" | "discussion">
      >;
      viewMode: "detail" | "discussion";
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
  const [viewMode, setViewMode] = useState<"detail" | "discussion">("detail");

  data.event_participations = data.event_participations.filter(
    (participation) => participation.profiles.id !== data.user_id
  );

  return (
    <eventDetailContext.Provider
      value={{
        ...data,
        isHost: isHost,
        isPariticpated: participate,
        loading: loading,
        setLoading: setLoading,
        setParticipate,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </eventDetailContext.Provider>
  );
};
