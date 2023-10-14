import gameProgress from "@/constants/progress";

export function convertStatus(status: keyof typeof gameProgress) {
  switch (status) {
    case "wishlist":
      return "added to wishlist";
    case "backlog":
      return "planned to play";
    case "play":
      return "is playing";
    case "beat":
      return "have beaten";
    case "pause":
      return "paused playing";
    case "quit":
      return "have quit";
    default:
      return "";
  }
}
