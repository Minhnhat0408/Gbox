export function isSessionOver(sessionDate: string) {
  const sessionDateObject = new Date(sessionDate);

  const now = new Date();

  return sessionDateObject < now;
}
