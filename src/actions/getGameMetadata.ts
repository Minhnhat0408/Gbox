import { GameData } from "@/types/ign/GameSearchType";

export const getGameMetaData = (game: GameData) => {
  const platform = getGamePlatform(game);
  const image = game?.primaryImage?.url || "/placeholder.jpg";
  const url = game.url;
  const shortName = game.metadata.names.short || game.metadata.names.name;
  const name = game.metadata.names.name;
  const producer =
    game.producers[0]?.shortName !== null
      ? game?.producers[0]?.shortName
      : game?.producers[0]?.name;
  const releaseDate = game.objectRegions[0]?.releases[0]?.date || null;
  return {
    platform,
    image,
    url,
    shortName,
    name,
    producer,
    releaseDate,
    slug: game.slug,
  };
};

export const getGamePlatform = (game: GameData) => {
  let datas: string[] = [];
  game.objectRegions.forEach((region) => {
    region.releases.forEach((release) => {
      release.platformAttributes.forEach((platform) => {
        datas.push(platform.slug);
      });
    });
  });
  const set = new Set(datas);
  let newArray: string[] = [];
  set.forEach((value) => {
    newArray.push(value);
  });
  return newArray;
};
