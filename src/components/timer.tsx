"use client";

import React, { useState, useEffect } from "react";

export default function Timer({
  initialTime = 0,
  mode = "stopwatch",
  func,
}: {
  initialTime?: number;
  mode?: "stopwatch" | "timer";
  func?: () => void;
}) {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(true);
  const [percentage, setPercentage] = useState(100);
  useEffect(() => {
    let interval: any = null;

    if (isActive && !(mode === "timer" && time <= 0)) {
      interval = setInterval(() => {
        setTime((prevTime) =>
          mode === "stopwatch" ? prevTime + 1 : prevTime - 1
        );
        if (mode === 'timer') {
            setPercentage((time - 1) / initialTime * 100);
          }
      }, 1000);
    } else if (!isActive && mode === "timer" && time !== initialTime) {
      setTime(initialTime);
      setPercentage(100);
    } else if (mode === "timer" && time <= 0) {
      clearInterval(interval);
      setIsActive(false);
      setPercentage(0); 
      if (func) {
        func();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, time, mode, initialTime]);

  const handleStartStop = () => {
    if (mode === 'timer' && time <= 0) {
        setTime(initialTime);
        setPercentage(100);
      }
      setIsActive(!isActive);
  };

  const formatTime = () => {
    const minutes = Math.floor(Math.abs(time) / 60);
    const seconds = Math.abs(time) % 60;

    return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div>
      {/* <h3>{mode === "stopwatch" ? "Stopwatch" : "Timer"}</h3> */}
      <div>{formatTime()}</div>
      <div className={mode === 'timer' ? 'w-20 h-20 rounded-full flex items-center justify-center text-base ' : ''} style={{background: `conic-gradient( green ${percentage}%, transparent 0)` }}>
        {formatTime()}
      </div>
      {/* <button onClick={handleStartStop}>{isActive ? "Stop" : "Start"}</button> */}
    </div>
  );
}
