import { User } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { ProfilesType } from "@/types/supabaseTableType";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: ProfilesTypeWithCoach | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export type ProfilesTypeWithCoach = ProfilesType & {
  coach_profiles: boolean;
};

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<ProfilesTypeWithCoach | null>(
    null
  );

  const getUserDetails = () =>
    supabase
      .from("profiles")
      .select("*, coach_profiles(id)")
      .eq("id", user?.id)
      .single();

  useEffect(() => {
    const fetch = async () => {
      if (user && !isLoadingData && !userDetails) {
        setIsLoadingData(true);
        const userDetailPromise = await getUserDetails();
        setUserDetails({
          ...userDetailPromise.data,
          coach_profiles: userDetailPromise.data.coach_profiles[0]
            ? true
            : false,
        } as ProfilesTypeWithCoach);

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
