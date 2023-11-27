import {
  queryGameComingSoon,
  queryUpcomingGameThisMonth,
} from "@/services/server/ignServerService";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import GameInformation from "./GameInformation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabaseTypes";
import { cookies } from "next/headers";
import { UserGameDataType } from "@/types/supabaseTableType";

async function UpcomingGame() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const getUserGameData = supabase
    .from("user_game_data")
    .select()
    .eq("user_id", user?.id!)
    .order("modified_date", { ascending: false });

  const [
    { data, status },
    { data: upcomingGameData, status: upcomingGameStatus },
    { data: userGameData, error },
  ] = await Promise.all([
    queryGameComingSoon(),
    queryUpcomingGameThisMonth(),
    getUserGameData,
  ]);

  if (error || userGameData?.length === 0) {
    return (
      <div className="flex flex-col items-center w-[90%]">
        <Tabs defaultValue="coming" className="w-full">
          <TabsList className="w-full mb-3">
            <TabsTrigger value="coming" className="w-[90%] text-base">
              Upcoming this week
            </TabsTrigger>
            <TabsTrigger className="w-[90%] text-base" value="upcoming">
              Released this month
            </TabsTrigger>
          </TabsList>
          <TabsContent value="coming">
            <div className="gap-y-7 pb-4 flex flex-col px-4 2xl:max-h-[calc(100vh-476px)] max-h-[calc(100vh-416px)] overflow-y-scroll">
              {data !== null ? (
                data.comingSoon.map((game, index) => {
                  return <GameInformation game={game} key={index} />;
                })
              ) : (
                <div className="text-center">There no game out this month</div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="upcoming" className="">
            {" "}
            <div className="gap-y-7 pb-4 flex flex-col px-4 2xl:max-h-[calc(100vh-476px)] max-h-[calc(100vh-416px)] overflow-y-scroll">
              {upcomingGameData !== null ? (
                upcomingGameData?.upcomingObjects.map((game, index) => {
                  return <GameInformation game={game} key={index} />;
                })
              ) : (
                <div className="text-center">There no game out this month</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  const userGameSlugs = (userGameData as UserGameDataType[]).map(
    (ugd) => ugd.game_meta_data.slug!
  );

  // userGameData have userGameData.game_meta_data.slug. Make a new array from upcomingGameData.upcomingObjects data.comingSoon
  // then that 2 arrays have only the boolean "true" if the slug is in userGameData.game_meta_data.slug

  return (
    <div className="flex flex-col items-center w-[90%]">
      <Tabs defaultValue="coming" className="w-full">
        <TabsList className="w-full mb-3">
          <TabsTrigger value="coming" className="w-[90%] text-base">
            Upcoming this week
          </TabsTrigger>
          <TabsTrigger className="w-[90%] text-base" value="upcoming">
            Released this month
          </TabsTrigger>
        </TabsList>
        <TabsContent value="coming">
          <div className="gap-y-7 pb-4 flex flex-col px-4 2xl:max-h-[calc(100vh-476px)] max-h-[calc(100vh-416px)] overflow-y-scroll">
            {data !== null ? (
              data.comingSoon.map((game, index) => {
                return (
                  <GameInformation
                    isInLibrary={userGameSlugs.includes(game.slug)}
                    game={game}
                    key={index}
                  />
                );
              })
            ) : (
              <div className="text-center">There no game out this month</div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="upcoming" className="">
          {" "}
          <div className="gap-y-7 pb-4 flex flex-col px-4 2xl:max-h-[calc(100vh-476px)] max-h-[calc(100vh-416px)] overflow-y-scroll">
            {upcomingGameData !== null ? (
              upcomingGameData?.upcomingObjects.map((game, index) => {
                return (
                  <GameInformation
                    isInLibrary={userGameSlugs.includes(game.slug)}
                    game={game}
                    key={index}
                  />
                );
              })
            ) : (
              <div className="text-center">There no game out this month</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UpcomingGame;
