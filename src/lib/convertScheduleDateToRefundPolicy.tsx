export function convertScheduleDateToRefundPolicy(date: Date, time: string) {
  // Combine date and time into a single Date object
  const [hours, minutes] = time.split(":").map(Number);
  const scheduleDateTime = new Date(date);
  scheduleDateTime.setHours(hours, minutes, 0, 0);

  // Get current date and time
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffMs = (scheduleDateTime as any) - (now as any);

  // Convert milliseconds to hours
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 24) {
    // Case 1: Less than 24 hours to the schedule
    return (
      <span className="text-xs">
        <span className="font-bold">50%</span> fee for any future cancellation
        or reschedule of this session
      </span>
    );
  } else {
    // Case 2: More than 24 hours to the schedule
    // Calculate the free reschedule deadline (24 hours before the scheduled time)
    const freeRescheduleDeadline = new Date(
      scheduleDateTime.getTime() - 24 * 60 * 60 * 1000
    );
    const deadlineHours = freeRescheduleDeadline.getHours();
    const deadlineMinutes = freeRescheduleDeadline.getMinutes();
    const deadlineAmPm = deadlineHours >= 12 ? "pm" : "am";
    const formattedHours = deadlineHours % 12 || 12;
    const formattedMinutes =
      deadlineMinutes < 10 ? "0" + deadlineMinutes : deadlineMinutes;
    const formattedDeadline = (
      <span className="text-xs">
        Free cancellation or reschedule until{" "}
        <span className="font-bold">
          {freeRescheduleDeadline.toDateString()}, {formattedHours}:
          {formattedMinutes}
          {deadlineAmPm}
        </span>
      </span>
    );

    return formattedDeadline;
  }
}
