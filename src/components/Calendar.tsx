'use client';

import { useState, ReactElement } from "react";
import { addMonths, subMonths, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

const daysOfWeek: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Task {
  date: Date;
  title: string;
  color: string;
}

const mockTasks: Task[] = [
  { date: new Date("2025-03-09"), title: "Math Revision", color: "bg-sky-500" },
  { date: new Date("2025-03-10"), title: "Math Exam", color: "bg-red-500" },
  { date: new Date("2025-03-11"), title: "Physics HW", color: "bg-sky-500" },
  { date: new Date("2025-03-12"), title: "English HW", color: "bg-sky-500" },
  { date: new Date("2025-03-13"), title: "Physics Due", color: "bg-orange-500" },
  { date: new Date("2025-03-13"), title: "English Due", color: "bg-orange-500" }
];

export default function Calendar(): ReactElement {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const prevMonth = (): void => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = (): void => setCurrentDate(addMonths(currentDate, 1));

  const monthStart: Date = startOfMonth(currentDate);
  const monthEnd: Date = endOfMonth(monthStart);
  const startDate: Date = startOfWeek(monthStart);
  const endDate: Date = endOfWeek(monthEnd);
  
  const days: Date[] = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="w-full bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-sky-200 cursor-pointer">
          <FaChevronLeft />
        </button>
        <h2 className="text-xl font-bold text-sky-950">{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-sky-200 cursor-pointer">
          <FaChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center font-semibold border-b border-sky-600 pb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-2 text-sky-950 uppercase text-sm">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center">
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => setSelectedDate(day)}
            className={`p-2 min-h-[70px] flex flex-col items-start justify-start cursor-pointer transition border-t border-sky-600 
              ${isSameMonth(day, monthStart) ? "bg-white" : "text-gray-400"} 
              ${isSameDay(day, selectedDate) ? "bg-sky-200" : "hover:bg-sky-100"}`}
          >
            <span className="text-sm font-semibold self-end text-sky-950">{format(day, "d")}</span>
            {mockTasks.filter(task => isSameDay(task.date, day)).map((task, i) => (
              <Link href={`/student/focus/${encodeURIComponent(task.title)}`} key={i} className={`${task.color} block text-white text-xs rounded px-2 py-1 mt-1 w-full truncate`}>
                {task.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
