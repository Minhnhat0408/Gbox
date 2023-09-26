type ThumbnaiLDetail = {
  url: string;
  width: number;
  height: number;
};

type ThumbnailType = "high" | "medium" | "default" | "maxresdefault";

type VideoThumbnail = Record<ThumbnailType, ThumbnaiLDetail>;

type VideoDetail = {
  id: number;
  /** https://www.youtube.com/watch?v={external_id} */
  external_id: string;
  channel_title: string;
  name: string;
  description: string;
  /** 2018-06-12T02:35:14Z format */
  created: string;
  view_count: number;
  like_count: number;
  thumbnails: VideoThumbnail;
};

type GameYoutubeVideoReturnType =
  | {
      status: 200;
      data: {
        results: VideoDetail[];
      };
    }
  | {
      status: 404;
      data: {
        results: [];
      };
    };

export type { VideoDetail, GameYoutubeVideoReturnType };
