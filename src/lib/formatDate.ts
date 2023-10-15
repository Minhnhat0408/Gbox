import { convertDate } from "./convertDate";

export function formatDate(date: string) {
  // format: YYYY-MM-DD
  // if today, return "Today"
  // if yesterday, return "Yesterday"
  // if tomorrow, return "Tomorrow"
  // else if in 2-7 days, return "In n days"
  // else return "YYYY-MM-DD"
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateObj = new Date(date);
  if (dateObj.toDateString() === today.toDateString()) {
    return "Today";
  } else if (dateObj.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else if (dateObj.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    const diff = Math.floor(
      (dateObj.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
    if (diff >= 2 && diff <= 7) {
      return `In ${diff} days`;
    } else {
      return convertDate(date);
    }
  }
}
