type GameRedditPost = {
  /** post title */
  name: string;
  /** post HTML Content */
  text: string;
  image: string | null;
  /** reddit post URL */
  url: string;
  /** /u/{user_name} */
  username: string;
  /** format: 2023-04-18T05:21:30Z" */
  created: string;
};

type GameRedditPostReturnType =
  | {
      status: 200;
      data: { results: GameRedditPost[] };
    }
  | {
      status: 404;
      data: { results: [] };
    };

export type { GameRedditPost, GameRedditPostReturnType };
