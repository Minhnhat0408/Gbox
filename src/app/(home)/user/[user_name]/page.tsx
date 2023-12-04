import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileBody from "@/components/profile/ProfileBody";
import { Database } from "@/types/supabaseTypes";
import { ProfilesType } from "@/types/supabaseTableType";
import { ProfileDetailProvider } from "@/providers/ProfileDetailProvider";
import GameLibInformationModal from "@/components/game-lib-information-modal/GameLibInformationModal";
import EditGameLibraryModal from "@/components/edit-game-library-modal/EditGameLibraryModal";

type UserProfileProps = { params: { user_name: string } };

async function UserPage({ params }: UserProfileProps) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const guessProfile = supabase
    .from("profiles")
    .select("*, coach_profiles(id)")
    .eq("name", params.user_name)
    .single();

  const peopleStatus = supabase.rpc("get_two_people_status", {
    currentuserid: user!.id,
    guestid: params.user_name,
  });

  const [guess, friendStatus] = await Promise.all([guessProfile, peopleStatus]);

  return (
    <div className="mx-8 !pt-[72px]">
      <ProfileDetailProvider
        data={guess.data as ProfilesType}
        isOwner={user?.id === (guess.data as ProfilesType).id}
      >
        <GameLibInformationModal />
        <EditGameLibraryModal />
        <ProfileHeader
          friendStatus={
            friendStatus.data !== null &&
            friendStatus.data[0]?.friend_request_status !== undefined
              ? friendStatus.data[0].friend_request_status
              : null
          }
          data={guess.data as ProfilesType}
          isCoach={
            guess.data?.coach_profiles && guess.data?.coach_profiles?.length > 0
              ? true
              : false
          }
        />
        <ProfileBody profile={guess.data as ProfilesType} />
      </ProfileDetailProvider>
    </div>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default UserPage;
