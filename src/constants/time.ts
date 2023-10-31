const months = Array.from({ length: 12 }, (_, i) => i + 1);

const dates = Array.from({ length: 31 }, (_, i) => i + 1);

const years = Array.from(
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

const dayTimes: string[] = [];

for (let hour = 0; hour < 24; hour++) {
  for (let minute = 0; minute < 60; minute += 15) {
    const hourString = hour.toString().padStart(2, "0");
    const minuteString = minute.toString().padStart(2, "0");
    dayTimes.push(`${hourString}:${minuteString}`);
  }
}

export { months, dates, years, hour, formattedTimes, dayTimes };
