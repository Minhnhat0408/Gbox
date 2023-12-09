"use client";

import React, { useState, useEffect } from "react";

const LiveSessionEnd = () => {
  const [ellipsis, setEllipsis] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsis((prevEllipsis) => {
        return prevEllipsis.length < 3 ? prevEllipsis + "." : ".";
      });
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="w-full p-20 h-full center">
      <div className="flex items-center flex-col gap-y-10">
        <h1 className="super font-bold text-5xl">
          {"TIME'S UP "}
          <span className="text-white">🥲</span>
        </h1>
        <div className="text-4xl font-bold relative">
          {`Your live session has ended`}
          <span className="absolute text-left left-[102%]">{ellipsis}</span>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionEnd;
