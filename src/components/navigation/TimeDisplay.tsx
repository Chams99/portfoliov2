"use client";

import { useEffect, useState } from "react";
import { DEFAULT_TIME_LOCALE, TIME_UPDATE_INTERVAL_MS } from "@/constants";

/**
 * Props for the TimeDisplay component.
 */
type TimeDisplayProps = {
  /** IANA time zone string (e.g., 'Africa/Tunis') */
  timeZone: string;
  /** Locale for time formatting (defaults to 'en-GB') */
  locale?: string;
};

/**
 * Displays the current time in a specified timezone.
 * Updates every second to show real-time clock.
 */
export const TimeDisplay = ({ 
  timeZone, 
  locale = DEFAULT_TIME_LOCALE 
}: TimeDisplayProps) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, TIME_UPDATE_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};
