export type GameNewsIGNServerReturnType =
  | {
      status: 200;
      data: {
        homepage: {
          contentFeed: {
            feedItems: {content: GameNewsData}[];
          };
        };
      };
    }
  | {
      status: 400;
      data: null;
    };

export type GameNewsData = {
    title: string;
    subtitle: string;
    publishDate: string;
    slug: string;
    feedTitle: string;
    feedImage: {
      url: string;
    };
    url: string;
    /**
     * @description Return game information related to news if exist
     */
    primaryObject?: GameNewsMetaData;
};

export type GameNewsMetaData = {
  url: string;
  slug: string;
  metadata: {
    names: {
      name: string;
      short: string;
    };
  };
};

export type GameNewsIGNClientReturnType =
  | {
      status: 200;
      data: GameNewsData[];
    }
  | {
      status: 400;
      data: null;
    };
