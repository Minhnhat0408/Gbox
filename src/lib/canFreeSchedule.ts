export function canFreeReschedule(schedule: string) {
  const scheduleDate = new Date(schedule);

  // compare schedule date - 24 hours with now

  const now = new Date();

  const diff = scheduleDate.getTime() - now.getTime();

  if (diff < 86400000) {
    return false;
  } else {
    return true;
  }
}
