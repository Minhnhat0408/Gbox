import {
  queryGameComingSoon,
  queryUpcomingGameThisMonth,
} from "@/services/server/ignServerService";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import GameInformation from "./GameInformation";

async function UpcomingGame() {
  const [
    { data, status },
    { data: upcomingGameData, status: upcomingGameStatus },
  ] = await Promise.all([queryGameComingSoon(), queryUpcomingGameThisMonth()]);

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

export default UpcomingGame;
