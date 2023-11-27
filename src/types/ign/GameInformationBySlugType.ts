export type GameInformationReturnType =
  | {
      status: 200;
      data: {
        objectSelectByTypeAndSlug: GameInformationData;
      };
    }
  | {
      status: 400;
      data: null;
    };

export type GameInformationData = {
  id: string;
  slug: string;
  url: string;
  metadata: GameInformationMetadata;
  genres: GameGenres[];
  producers: GameProducers[];
  primaryImage: {
    url: string;
  };
};

export type GameInformationMetadata = {
  /**
   * description with HTML type
   */
  descriptions: {
    long: string;
    short: string;
  };
  names: {
    name: string;
    short: string;
  };
};

export type GameGenres = {
  name: string;
  slug: string;
};

export type GameProducers = {
  name: string;
  shortName: string | null;
  slug: string;
};

export type GameInformationClientReturnType =
  | {
      status: 200;
      data: GameInformationData;
    }
  | {
      status: 400;
      data: null;
    };
