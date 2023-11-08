export function convertUserStatus(
  status: "friend" | "anotherUser" | "withSimilarGame",
  gameName: string | null
) {
  switch (status) {
    case "friend":
      return "friend";
    case "anotherUser":
      return "user on platform";
    case "withSimilarGame":
      return `also play ${gameName || "similar game"}`;
    default:
      return "user on platform";
  }
}
