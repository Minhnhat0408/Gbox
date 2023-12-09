import { dayTimes } from "@/constants/time";

function findNearestTimeIndexInFuture(
  appointmenDate: Date | null | undefined,
  choosenDate: Date | null | undefined
) {
  if (
    appointmenDate === null ||
    appointmenDate === undefined ||
    choosenDate === null ||
    choosenDate === undefined
  )
    return 0;
  const appointment = new Date(appointmenDate);
  const currentTimeInMinutes =
    appointment.getHours() * 60 + appointment.getMinutes();

  if (
    appointmenDate.getDate() !== choosenDate.getDate() ||
    appointmenDate.getMonth() !== choosenDate.getMonth() ||
    appointmenDate.getFullYear() !== choosenDate.getFullYear()
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

export default findNearestTimeIndexInFuture;
