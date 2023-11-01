import { DateTime } from "luxon";

export const formatDateString = (date: string) => {
  const dateObj = new Date(date);
  return DateTime.fromJSDate(dateObj).toLocaleString({
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
