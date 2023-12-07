import { convertDurationToMinute } from "./convertDurationToMinute";

export function getSessionEndDate(startDate: string, duration: string) {
  const date = new Date(startDate);

  const minute = convertDurationToMinute(duration);

  date.setMinutes(date.getMinutes() + minute);

  return date.toISOString();
}
