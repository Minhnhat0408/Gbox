const month = Array.from({ length: 12 }, (_, i) => i + 1);

const date = Array.from({ length: 31 }, (_, i) => i + 1);

const year = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);

const minute = ["00", "15", "30", "45"];
const hour = Array.from({ length: 12 }, (_, i) => i);

const formattedTimes: string[] = [];

hour.forEach((h) => {
  minute.forEach((m) => {
    formattedTimes.push(`${h}:${m}`);
  });
});

export { month, date, year, hour, formattedTimes };
