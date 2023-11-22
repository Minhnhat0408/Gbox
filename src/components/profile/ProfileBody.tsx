import { ProfilesType, UserGameDataType } from "@/types/supabaseTableType";
import ChartGame from "./ChartGame";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabaseTypes";
import { cookies } from "next/headers";
import { GameProgressType } from "@/types/gameProgressType";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ProfileViewMode from "./ProfileViewMode";

ChartJS.register(ArcElement, Tooltip, Legend);

export default async function ProfileBody({
  profile,
}: {
  profile: ProfilesType;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = (await supabase
    .from("user_game_data")
    .select()
    .eq("user_id", profile.id)
    .order("modified_date", { ascending: false })
    .limit(10)) as unknown as { data: UserGameDataType[]; error: any };

  return (
    <div className="xl:gap-x-18 2xl:gap-x-32 relative flex justify-between gap-10 mt-12">
      <div id="Left" className="bg-slate-900 w-3/5 bg-opacity-0">
        <ProfileViewMode profile={profile} data={data} />
      </div>
      <ChartGame data={data} />
    </div>
  );
}
