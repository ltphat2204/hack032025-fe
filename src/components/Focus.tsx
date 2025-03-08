'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

const FocusPage = ({ event }: { event: string }) => {
  // Default Pomodoro timer duration (25 minutes)
  const defaultTime = 25 * 60; // 25 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && interval) {
      clearInterval(interval);
      alert("Pomodoro session finished!");
    }

    return () => {
        if (interval) {
            clearInterval(interval);
        }
    }
  }, [isActive, timeLeft]);

  const startTimer = () => setIsActive(true);
  const stopTimer = () => setIsActive(false);
  const resetTimer = () => setTimeLeft(defaultTime);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-sky-100 p-8">
        <Link href="/student">
            <RxCross1 className="absolute right-4 top-4 text-2xl" />
        </Link>
      <div className="max-w-4xl mx-auto text-center flex items-center justify-center h-full flex-col pb-16">
          <h1 className="text-sky-950 text-2xl font-semibold mb-12 text-center">
            Focus on: {event || "Loading..."}
          </h1>
          <Image className="mt-6 mb-4" src="/bot.png" alt="StudyVerse Bot" width={200} height={200} />
          <p className="text-sky-950 text-8xl font-bold">{formatTime(timeLeft)}</p>

          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={startTimer}
              className="bg-sky-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition duration-300"
            >
              Start
            </button>
            <button
              onClick={stopTimer}
              className="bg-sky-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition duration-300"
            >
              Stop
            </button>
            <button
              onClick={resetTimer}
              className="bg-sky-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition duration-300"
            >
              Reset
            </button>
            <button
              className="bg-sky-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition duration-300"
            >
              Customize
            </button>
          </div>
      </div>
    </div>
  );
};

export default FocusPage;
