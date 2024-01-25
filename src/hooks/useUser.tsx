import { User } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { ProfilesType, UserMissionsDetail } from "@/types/supabaseTableType";
import useRoomLobby from "./useRoomLobby";
import { useMatchingRoom } from "./useMatchingRoom";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: ProfilesTypeWithCoach | null;
  usersStatus: { username: string; online_at: string }[];
  missions: UserMissionsDetail[] | null;
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

  const [missions, setMissions] = useState<UserMissionsDetail[] | null>(null);

  const [usersStatus, setUsersStatus] = useState<
    { username: string; online_at: string }[]
  >([]);
  const getUserDetails = () =>
    supabase
      .from("profiles")
      .select("*, coach_profiles(id), user_missions(*, missions(*))")
      .eq("id", user?.id)
      .single();

  useEffect(() => {
    const fetch = async () => {
      if (user && !isLoadingData && !userDetails) {
        setIsLoadingData(true);
        const userDetailPromise = await getUserDetails();

        setMissions(userDetailPromise.data.user_missions);

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

  useEffect(() => {
    if (userDetails) {
      const roomOne = supabase.channel("gbox_presence");
      const userStatus = {
        username: userDetails?.name,
        online_at: new Date().toISOString(),
      };

      roomOne
        .on("presence", { event: "sync" }, () => {
          const newState = roomOne.presenceState();
          const users = Object.keys(newState)
            .map((presenceId) => {
              const presences = newState[presenceId] as unknown as {
                username: string;
                online_at: string;
              }[];
              return presences.map((presence) => {
                return {
                  username: presence.username,
                  online_at: presence.online_at,
                };
              });
            })
            .flat();
          setUsersStatus(users);
          // console.log(newState, "sync");
        })
        .on("presence", { event: "join" }, ({ key, newPresences }) => {
          // console.log("join", key, newPresences);
          newPresences.forEach((info) => {
            if (info.username !== userDetails?.name) {
              toast.success(`${info.username} is online`);
            }
          });

          // set users status to offline
        })
        .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
          // console.log("leave", key, leftPresences);
          // toast.message(`${key} is offline`);
          leftPresences.forEach((info) => {
            if (info.username !== userDetails?.name) {
              toast.message(`${info.username} is offline`);
            }
          });
        })
        .subscribe(async (status) => {
          if (status !== "SUBSCRIBED") {
            return;
          }
          const presenceTrackStatus = await roomOne.track(userStatus);
          console.log(presenceTrackStatus);
        });

      return () => {
        roomOne.untrack();
        roomOne.unsubscribe();
      };
    }
  }, [userDetails]);

  const value: UserContextType = {
    accessToken,
    user,
    userDetails,
    usersStatus,
    isLoading: isLoadingData,
    missions,
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
