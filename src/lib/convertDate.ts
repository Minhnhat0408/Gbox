export function convertDate(date: string | null | undefined) {
  if (date === null || date === undefined) return "Unknown";
  // date: 'YYYY-MM-DD'
  // return: Month Date, Year
  // example: 2000-01-01 => January 1, 2000
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "long" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${month} ${day}, ${year}`;
}
