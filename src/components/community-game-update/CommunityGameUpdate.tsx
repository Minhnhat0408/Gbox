import gameProgress from "@/constants/progress";
import { convertStatus } from "@/lib/convertStatus";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

async function CommunityGameUpdate() {
  const supabase = createServerComponentClient({ cookies });

  const { data: userData, error: userError } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("user_game_data")
    .select("*, profiles(*)")
    .neq("user_id", userData.user!.id)
    .order("modified_date", { ascending: false })
    .limit(3);

  return (
    <div className="gap-y-6 relative flex flex-col items-center w-full">
      {data?.map((gameData: any, index: number) => {
        return (
          <div
            key={index}
            className="min-h-[80px] bg-no-repeat max-h-[80px] items-center flex w-[90%] rounded-2xl bg-card py-2 px-4 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${gameData.game_meta_data.image})`,
            }}
          >
            <div className="flex items-center h-full">
              {gameProgress[gameData.status as keyof typeof gameProgress].icon(
                "w-7 h-7",
                "w-10 h-10 rounded-xl"
              )}
            </div>
            <div className="ml-3 truncate max-w-[70%]">
              <a
                target="_blank"
                className="hover:underline text-lg font-bold text-green-500 truncate"
                href={"https://ign.com" + gameData.game_meta_data.url}
              >
                {gameData.game_meta_data.shortName ||
                  gameData.game_meta_data.name}
              </a>
              <div className="mt-[3px] text-sm text-gray-300 truncate">
                {convertStatus(gameData.status)} by{" "}
                <Link
                  className="hover:underline"
                  href={"/user/" + gameData.profiles?.name}
                >
                  {gameData.profiles?.name}
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CommunityGameUpdate;
