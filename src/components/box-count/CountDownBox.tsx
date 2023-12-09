"use client";
import { useState, useEffect } from "react";

export default function CountDown2({ date }: { date: string }) {
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
    <div className="flex scale-125  w-full h-[150px] select-none items-center mt-4 justify-center space-x-12">
      <div className="font-bold flex w-[100px] bg-white h-[100px] flex-col justify-center rounded-xl  space-y-2 items-center">
        <div className="center flex-col">
          <span className="text-3xl  text-teal-500">{timeLeft.days}</span>
          <span className="text-base mt-1 text-teal-500 capitalize font-bold">
            days
          </span>
        </div>
      </div>
      <div className="font-bold flex w-[100px] bg-white h-[100px] flex-col justify-center rounded-xl  space-y-2 items-center">
        <div className="center flex-col">
          <span className="text-3xl  text-teal-500">{timeLeft.hours}</span>
          <span className="text-base mt-1 text-teal-500 capitalize font-bold">
            hours
          </span>
        </div>
      </div>
      <div className="font-bold flex w-[100px] bg-white h-[100px] flex-col justify-center rounded-xl  space-y-2 items-center">
        <div className="center flex-col">
          <span className="text-3xl  text-teal-500">{timeLeft.minutes}</span>
          <span className="text-base mt-1 text-teal-500 capitalize font-bold">
            minutes
          </span>
        </div>
      </div>
      <div className="font-bold flex w-[100px] bg-white h-[100px] flex-col justify-center rounded-xl  space-y-2 items-center">
        <div className="center flex-col">
          <span className="text-3xl  text-teal-500">{timeLeft.seconds}</span>
          <span className="text-base mt-1 text-teal-500 capitalize font-bold">
            seconds
          </span>
        </div>
      </div>
    </div>
  );
}
