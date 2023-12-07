export function updateScheduleDate(schedule: Date, time: string) {
  const [hour, minute] = time.split(":");

  const scheduleDate = new Date(schedule);

  scheduleDate.setHours(parseInt(hour, 10));
  scheduleDate.setMinutes(parseInt(minute, 10));

  console.log(scheduleDate.toLocaleString());

  return scheduleDate;
}
