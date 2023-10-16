import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { ProfilesType } from "@/types/supabaseTableType";
import CurrentGame from "./CurrentGame";
import ChartGame from "./ChartGame";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabaseTypes";
import { cookies } from "next/headers";
import { GameProgressType } from "@/types/gameProgressType";
import PostsScroll from "@/components/post-ui/posts-scroll";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

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
    .limit(10)) as unknown as { data: GameProgressType[]; error: any };

  return (
    <div className="xl:gap-x-18 2xl:gap-x-32 flex justify-between gap-10 mt-8">
      <div id="Left" className="bg-slate-900 w-3/5 bg-opacity-0">
        <div id="CurrentGame" className="w-full">
          <h1 className="mb-6 text-xl font-semibold uppercase">
            Currently <span className="super">playing</span>
          </h1>
          <CurrentGame data={data} />
        </div>

        <div className="mt-10">
          <h1 className="mb-6 text-xl font-semibold uppercase">
            Gaming <span className="super">feed</span>
          </h1>
          <div className="gap-x-3 flex w-full">
            <div id="Game_Filter" className="w-[30%]">
              <Select>
                <SelectTrigger className="">
                  <SelectValue className="" placeholder="Game filter" />
                </SelectTrigger>

                <SelectContent className="bg-background">
                  <SelectGroup>
                    <SelectItem
                      className="bg-background hover:bg-muted"
                      value="League of Legends"
                    >
                      League of Legends
                    </SelectItem>

                    <SelectItem
                      className="bg-background hover:bg-muted"
                      value="Valorant"
                    >
                      Valorant
                    </SelectItem>

                    <SelectItem
                      className="bg-background hover:bg-muted"
                      value="Genshin Impact"
                    >
                      Genshin Impact
                    </SelectItem>

                    <SelectItem
                      className="bg-background hover:bg-muted"
                      value="CS:GO"
                    >
                      CS:GO
                    </SelectItem>

                    <SelectItem
                      className="bg-background hover:bg-muted"
                      value="Free Fire"
                    >
                      Free Fire
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div id="Sort_by" className="w-[30%]">
              <Select>
                <SelectTrigger className="">
                  <SelectValue className="" placeholder="Sort by" />
                </SelectTrigger>

                <SelectContent className="bg-background">
                  <SelectGroup>
                    <SelectItem
                      className="bg-background hover:bg-muted"
                      value="Newest"
                    >
                      Newest
                    </SelectItem>

                    <SelectItem
                      className="bg-background hover:bg-muted"
                      value="Oldest"
                    >
                      Oldest
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <PostsScroll
            location="profile"
            userID={profile.id ? profile.id : undefined}
          />
        </div>
      </div>

      <ChartGame data={data} />
    </div>
  );
}
