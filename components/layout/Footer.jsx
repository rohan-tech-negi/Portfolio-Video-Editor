"use client";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <footer className="fixed bottom-0 left-0 w-full h-48 bg-gray-900 text-white flex flex-col items-center justify-center z-0">
      <h2 className="text-2xl font-semibold tracking-wide">
        Rohan
      </h2>

      <p className="mt-2 text-sm text-gray-300">
        {formattedTime}
      </p>

      <p className="mt-1 text-sm text-gray-400">
        New Delhi, Delhi
      </p>
    </footer>
  );
};

export default Footer;