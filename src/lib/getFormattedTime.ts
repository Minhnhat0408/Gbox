export function getFormattedTime(date: any) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Adding leading zero if the number is less than 10
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes;
}
