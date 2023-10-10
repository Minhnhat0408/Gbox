export type GameProgress =
  | "wishlist"
  | "backlog"
  | "play"
  | "pause"
  | "beat"
  | "quit";

export type GameProgressType = {
  [key in GameProgress]: {
    label: string;
    icon: (className: string, classNameParents?: string) => JSX.Element;
  };
};
