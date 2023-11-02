"use client";

import { useEffect, useState } from "react";

export default function CountDown({ date }: { date: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const endDate = new Date(date);
      const diff = endDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);
  return (
    <div className="absolute top-3 right-4 flex items-center space-x-[15px]">
      <div className="flex flex-col items-center space-y-1 relative after:-right-[5px] after:content-[':'] after:text-xs after:absolute after:top-[2px] after:text-white">
        <h3 className="text-sm font-semibold">{timeLeft.days}</h3>
        <p className="text-xs text-gray-300">DAY</p>
      </div>
      <div className="flex flex-col items-center space-y-1 relative after:-right-0 after:content-[':'] after:text-xs after:absolute after:top-[2px] after:text-white">
        <h3 className="text-sm font-semibold">{timeLeft.hours}</h3>
        <p className="text-xs text-gray-300">HOUR</p>
      </div>
      <div className="flex flex-col items-center space-y-1 relative after:-right-[7px] after:content-[':'] after:text-xs after:absolute after:top-[2px] after:text-white">
        <h3 className="text-sm font-semibold">{timeLeft.minutes}</h3>
        <p className="text-xs text-gray-300">MIN</p>
      </div>
      <div className="flex flex-col items-center space-y-1 relative">
        <h3 className="text-sm font-semibold">{timeLeft.seconds}</h3>
        <p className="text-xs text-gray-300">SEC</p>
      </div>
    </div>
  );
}
