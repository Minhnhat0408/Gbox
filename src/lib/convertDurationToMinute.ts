export function convertDurationToMinute(duration: string) {
  let totalMinutes = 0;
  if (duration.includes("hour")) {
    let parts = duration.split(" ");
    totalMinutes += parseInt(parts[0]) * 60; // add hours to minutes
    if (parts.length > 2) {
      totalMinutes += parseInt(parts[2]); // add minutes if present
    }
  } else {
    totalMinutes += parseInt(duration); // add minutes directly
  }

  return totalMinutes;
}
