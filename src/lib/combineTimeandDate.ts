export default function combineTimeandDate(baseDate: Date, timeString: string) {
  const [hours, minutes] = timeString.split(":").map(Number);
  const newDate = new Date(baseDate);
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  return newDate;
}
