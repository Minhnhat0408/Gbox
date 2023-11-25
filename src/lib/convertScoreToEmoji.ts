const convertScoreToEmoji = (score: number | undefined | null) => {
  if (score === undefined || score === null) return "🐧";

  if (score < 0) return "🐧";
  if (score >= 0 && score < 1) return "😡";
  if (score >= 1 && score < 2) return "😔";
  if (score >= 2 && score < 3) return "😞";
  if (score >= 3 && score < 4) return "😓";
  if (score >= 4 && score < 5) return "🤨";
  if (score >= 5 && score < 6) return "🤔";
  if (score >= 6 && score < 7) return "😐";
  if (score >= 7 && score < 8) return "😌";
  if (score >= 8 && score < 9) return "😆";
  if (score >= 9 && score < 10) return "🤯";
  if (score == 10) return "😇";
};

export default convertScoreToEmoji;
