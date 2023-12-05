import { Schedule } from "@/hooks/useProcessBuySessionModal";

export function convertScheduleToDateArray(schedules: Schedule[]) {
  const scheduleNews = schedules.map((schedule) => {
    const { date, startTime } = schedule;
    const [hours, minutes] = startTime.split(":").map(Number);

    // Create a new Date object based on the existing date
    const newDate = new Date(date);

    // Set the hours and minutes from the startTime
    newDate.setHours(hours, minutes);
    return newDate;
  });

  scheduleNews.forEach((date) => console.log(date.toString()));

  return scheduleNews;
}
