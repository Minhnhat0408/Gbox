import { dayTimes } from "@/constants/time";

function findNearestTimeIndex(starteDate: Date | null | undefined) {
  if (starteDate === null || starteDate === undefined) return 0;
  const now = new Date();
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (
    starteDate.getDate() !== today.getDate() ||
    starteDate.getMonth() !== today.getMonth() ||
    starteDate.getFullYear() !== today.getFullYear()
  ) {
    return 0;
  }

  let nearestIndex = 0;
  let minTimeDifference = Infinity;

  for (let i = 0; i < dayTimes.length; i++) {
    const [hour, minute] = dayTimes[i].split(":");
    const timeInMinutes = parseInt(hour, 10) * 60 + parseInt(minute, 10);

    if (timeInMinutes > currentTimeInMinutes) {
      const timeDifference = timeInMinutes - currentTimeInMinutes;
      if (timeDifference < minTimeDifference) {
        nearestIndex = i;
        minTimeDifference = timeDifference;
      }
    }
  }

  return nearestIndex;
}

export default findNearestTimeIndex;
