import { User } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { ProfilesType } from "@/types/supabaseTableType";
import useRoomLobby from "./useRoomLobby";
import { useMatchingRoom } from "./useMatchingRoom";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: ProfilesType | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<ProfilesType | null>(null);
  const {setRoomId,setRoomData} = useMatchingRoom((set) => set);
  const getUserDetails = () =>
    supabase.from("profiles").select("*").eq("id", user?.id).single();

  useEffect(() => {
    const fetch = async () => {
      if (user && !isLoadingData && !userDetails) {
        setIsLoadingData(true);
        const userDetailPromise = await getUserDetails();
       
        setUserDetails(userDetailPromise.data as ProfilesType);
        setIsLoadingData(false);
      } else if (!user && !isLoadingData && !isLoadingUser) {
        setUserDetails(null);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoadingUser]);

  const value: UserContextType = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingData,
  };

  return <UserContext.Provider value={value} {...props}></UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }

  return context;
};
