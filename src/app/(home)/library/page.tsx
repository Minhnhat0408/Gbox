import UserGameLibrary from "@/components/library-page/UserGameLibrary";
import LibraryHeader, {
  StatisticType,
} from "@/components/library-page/library-header";
import { ProfilesType } from "@/types/supabaseTableType";
import { Database } from "@/types/supabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const LibraryGamingPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const getStatistics = supabase.rpc("count_status_by_user", {
    user_id_param: user!.id,
  });

  const getProfileData = supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  const [data, statistics] = await Promise.all([getProfileData, getStatistics]);

  return (
    <div className="mx-8 !pt-[72px] px-14">
      <LibraryHeader
        data={data.data as ProfilesType}
        statistics={statistics.data as StatisticType}
      />
      <UserGameLibrary />
    </div>
  );
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default LibraryGamingPage;
