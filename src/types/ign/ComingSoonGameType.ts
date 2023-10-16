export type ComingSoonGameType =
  | {
      status: 200;
      data: {
        comingSoon: ComingGameData[];
      };
    }
  | {
      status: 400;
      data: null;
    };

export type ComingGameData = {
  name: string;
  slug: string;
  url: string;
  imageUrl: string;
  platforms: string[];
  platformSlugs: string[];
  releaseDate: string;
  reviewScore: null;
};

export type UpcomingGameType =
  | {
      status: 200;
      data: {
        upcomingObjects: ComingGameData[];
      };
    }
  | {
      status: 400;
      data: null;
    };
