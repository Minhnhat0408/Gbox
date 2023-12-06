"use client";

import RoomShortCut from "@/components/matching-room-ui/room-shortcut";
import { useMatchingRoom } from "@/hooks/useMatchingRoom";
import { MyUserContextProvider } from "@/hooks/useUser";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const { roomId, isOpen } = useMatchingRoom((set) => set);
  return (
    <MyUserContextProvider>
      {children}
      {roomId && !isOpen && (
        <RoomShortCut />
      )}
    </MyUserContextProvider>
  );
};

export default UserProvider;
