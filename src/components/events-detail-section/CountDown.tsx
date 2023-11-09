"use client";
import { useState, useEffect } from "react";

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
    <div className="flex w-full h-[150px] items-center justify-center space-x-16">
      <div className="font-bold flex flex-col space-y-2 items-center">
        <span className="text-3xl super">{timeLeft.days}</span>
        <span className="text-base font-normal">days</span>
      </div>
      <div className="font-bold flex flex-col space-y-2 items-center">
        <span className="text-3xl super">{timeLeft.hours}</span>
        <span className="text-base font-normal">hours</span>
      </div>
      <div className="font-bold flex flex-col space-y-2 items-center">
        <span className="text-3xl super">{timeLeft.minutes}</span>
        <span className="text-base font-normal">minutes</span>
      </div>
      <div className="font-bold flex flex-col space-y-2 items-center">
        <span className="text-3xl super">{timeLeft.seconds}</span>
        <span className="text-base font-normal">seconds</span>
      </div>
    </div>
  );
}
