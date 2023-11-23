export function convertScoreColor(score: number | undefined | null) {
  if (score === undefined || score === null) {
    return "text-zinc-300";
  }

  if (score >= 10) {
    return "super";
  }
  if (score >= 9) {
    return "text-green-500";
  }
  if (score >= 8) {
    return "text-emerald-500";
  }
  if (score >= 7) {
    return "text-[#d7ea50]";
  }
  if (score >= 6) {
    return "text-[#afee7c]";
  }
  if (score >= 5) {
    return "text-yellow-400";
  }
  if (score >= 4) {
    return "text-[#ffe924]";
  }
  if (score >= 3) {
    return "text-[#ffab25]";
  }
  if (score >= 2) {
    return "text-[#fe8b26]";
  }
  if (score >= 1) {
    return "text-[#ff6c26]";
  }
  if (score >= 0) {
    return "text-zinc-300";
  }
}
