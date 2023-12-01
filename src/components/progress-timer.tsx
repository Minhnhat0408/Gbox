"use client";

import { useEffect, useRef, useState } from "react";
import { Progress } from "./ui/progress";

export default function ProgressTimer({
  initialTime,
  className,
}: {
  initialTime: number;
  className?: string;
}) {
  const [percentage, setPercentage] = useState(100);
  const time = useRef(initialTime);
  useEffect(() => {
    let interval: any = null;

    interval = setInterval(() => {
      time.current = time.current - 0.1;

      setPercentage((time.current / initialTime) * 100);
    }, 100);

    return () => clearInterval(interval);
  }, [initialTime]);

  return <Progress className={className} value={percentage} />;
}
