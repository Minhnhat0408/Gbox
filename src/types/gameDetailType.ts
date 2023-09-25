import { BasicInformation, GameClip, GameTags } from "./gameSearchType";

type GameDetailResponseType =
  | {
      status: 200;
      data: GameDetail;
    }
  | {
      status: 404;
      data: {};
    };

type GamePlatform = {
  platform: BasicInformation & {
    image_background: string;
  };
  /** game released at: YYYY-MM-DD */
  released_at: string;
  requirements: {};
};

type GameStores = {
  /** where to buy the game */
  url: string;
  store: BasicInformation;
};

type GameRating = {
  id: number;
  title: string;
  percent: number;
  count: number;
};

type UserPlayStatus = {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
};

type GameDetail = {
  id: string;
  name: string;
  /** not really different from "name" */
  name_orginal: string;
  /** HTML text content */
  description: string;
  /** Text content descrption */
  description_raw: string;
  /** score from 0 to 100 */
  metacritic: number;
  metacritic_url: string;
  /** YYYY-MM-DD */
  released: string;
  background_image: string;
  background_image_additional: string;
  /** offical website */
  website: string;
  /** max rating: 5 */
  rating: number;
  /** rating to define which ratings title it is */
  rating_top: number;
  ratings: GameRating[];
  added_by_status: UserPlayStatus;
  playtime: number;
  platforms: GamePlatform;
  stores: GameStores[];
  genres: BasicInformation[];
  tags: GameTags[];
  esrb_rating: {
    name: string;
  };
  clip: GameClip;
};

export type { GameDetailResponseType, GameDetail };
