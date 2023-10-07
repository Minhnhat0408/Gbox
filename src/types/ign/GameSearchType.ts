export type GameIGNSearchReturnType =
  | {
      status: 200;
      data: GameSearchData;
    }
  | {
      status: 400;
      data: null;
    };

export type GameIGNSearchClientType =
  | {
      status: 200;
      data: GameData[];
    }
  | {
      status: 400;
      data: null;
    };

export type GameSearchData = {
  searchObjectsByName: {
    objects: GameData[];
    pageInfo: {
      hasNext: boolean;
      nextCursor: number;
      total: number;
    };
  };
};

export type GameData = {
  slug: string;
  url: string;
  metadata: {
    names: {
      name: string;
      alt: string[];
      short: string;
    };
  };
  primaryImage: {
    url: string;
  };
  producers: [
    {
      name: string;
      shortName: string;
      slug: string;
    }
  ];
  genres: [
    {
      name: string;
      slug: string;
      __typename: string;
    }
  ];
  objectRegions: Regions[];
};

export type Regions = {
  releases: {
    date: string;
    platformAttributes: [
      {
        name: string;
        slug: string;
      }
    ];
  }[];
};
