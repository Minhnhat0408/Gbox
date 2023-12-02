import React, { useState, useEffect } from "react";

export default function Timer({
  initialTime = 0,
  mode = "stopwatch",
  startTime = null,
  func,
}: {
  initialTime?: number;
  mode?: "stopwatch" | "timer";
  startTime?: Date | null;
  func?: () => void;
}) {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(true);
  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        if (mode === "stopwatch") {
          if (startTime) {
            const elapsed = Math.floor(
              (new Date().getTime() - startTime.getTime()) / 1000
            );
            setTime(elapsed);
          } else {
            setTime((prevTime) => prevTime + 1);
          }
        } else if (mode === "timer") {
          setTime((prevTime) => prevTime - 1);
          setPercentage(((time - 1) / initialTime) * 100);
        }

        if (mode === "timer" && time <= 0) {
          clearInterval(interval);
          setIsActive(false);
          setPercentage(0);
          if (func) {
            func();
          }
        }
      }, 1000);
    } else if (!isActive && mode === "timer" && time !== initialTime) {
      setTime(initialTime);
      setPercentage(100);
    }

    return () => clearInterval(interval);
  }, [isActive, time, mode, initialTime, startTime]);

  const formatTime = () => {
    const minutes = Math.floor(Math.abs(time) / 60);
    const seconds = Math.abs(time) % 60;

    return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return <div>{formatTime()}</div>;
}
