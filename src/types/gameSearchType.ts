type GameSearchReturnType = {
  status: 200 | 404;
  data: GameSearchDetail[];
};

/** axios return type */
type GameSearchResult = {
  data: {
    result: GameSearchDetail[];
  };
};

type BasicInformation = {
  id: number;
  name: string;
  /** https://rawg.io/games/{slug} */
  slug: string;
};

type GamePlatforms = {
  platform: BasicInformation;
};

type GameStores = {
  store: BasicInformation;
};

// still basicinformation but with 2 more key: languages, game_count + bg_image
type GameTags = BasicInformation & {
  /** can be "eng" or another language */
  language: string;
  image_background: string;
};

type GameClip = {
  /** small demo gameplay (640px) */
  clip: string;
  /** image preview of clip */
  preview: string;
  /** youtube.com/watch?v={video} */
  video: string;
};

type Screenshots = {
  id: string;
  image: string;
};

type GameSearchDetail = {
  id: number;
  /**
   * Use to assign to RAWG url for more information
   * Example: https://rawg.io/games/${slug}
   */
  slug: string;
  /** name of the game */
  name: string;
  /** online game or no data if = 0 */
  playtime: number;
  platforms: GamePlatforms[];
  stores: GameStores[];
  /** date format: YYYY-MM-DD */
  released: string;
  background_image: string;
  /** from 0 to 100 */
  metacritic: number;
  /** from 0 to 100 */
  score: number;
  /** image preview + small clip about the game */
  clip: GameClip;
  genres: GameTags[];
  short_screenshots: Screenshots[];
  /** rating based on player's age */
  esrb_rating: {
    name: string;
  } | null;
};

export type {
  BasicInformation,
  GameSearchReturnType,
  GameSearchResult,
  GameSearchDetail,
  GameTags,
  GameClip,
};
