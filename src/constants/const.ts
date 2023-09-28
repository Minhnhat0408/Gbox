const month = Array.from({ length: 12 }, (_, i) => i + 1);
const date = Array.from({ length: 31 }, (_, i) => i + 1);
const year = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);

export { month, date, year };
