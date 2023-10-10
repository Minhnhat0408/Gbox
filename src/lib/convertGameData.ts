import { GameData } from "@/types/ign/GameSearchType";
import { UserGameDataType } from "@/types/supabaseTableType";

export function converGameData(data: UserGameDataType): GameData {
  return {
    slug: data!.game_meta_data.slug,
    url: data!.game_meta_data.url,
    metadata: {
      names: {
        name: data!.game_meta_data.name,
        short: data!.game_meta_data.name,
      },
    },
    primaryImage: {
      url: data!.game_meta_data.image,
    },
    producers: [
      {
        shortName: data!.game_meta_data.producer || "",
      },
    ],
    objectRegions: [
      {
        releases: [
          {
            date: data!.game_meta_data.releaseDate || "",
            platformAttributes: data!.game_meta_data.platform.map((e) => ({
              slug: e,
            })),
          },
        ],
      },
    ],
  };
}
