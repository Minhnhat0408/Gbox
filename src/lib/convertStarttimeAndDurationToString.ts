export function convertStarttimeAndDurationToString(
  startTime: string,
  duration: string
) {
  // Convert startTime to a Date object
  const [hours, minutes] = startTime.split(":").map(Number);
  let startDate = new Date();
  startDate.setHours(hours, minutes, 0, 0); // set hours and minutes

  // Function to format date to "HH:MMam/pm"
  function formatAMPM(date: any) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + ampm;
  }

  // Convert duration to total minutes
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

  // Calculate end time
  let endDate = new Date(startDate.getTime() + totalMinutes * 60000);

  // Format start and end times
  let formattedStartTime = formatAMPM(startDate);
  let formattedEndTime = formatAMPM(endDate);

  return formattedStartTime + " - " + formattedEndTime;
}
