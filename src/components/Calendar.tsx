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
  // February
  { date: new Date("2025-02-10"), title: "History HW", color: "bg-sky-500" },
  { date: new Date("2025-02-12"), title: "History Due", color: "bg-orange-500" },
  { date: new Date("2025-02-14"), title: "Literature Revision", color: "bg-sky-500" },
  { date: new Date("2025-02-15"), title: "Literature Exam", color: "bg-red-500" },
  { date: new Date("2025-02-18"), title: "Biology HW", color: "bg-sky-500" },
  { date: new Date("2025-02-19"), title: "Math Revision", color: "bg-sky-500" },
  { date: new Date("2025-02-20"), title: "Biology Due", color: "bg-orange-500" },
  { date: new Date("2025-02-21"), title: "Math Exam", color: "bg-red-500" },
  { date: new Date("2025-02-22"), title: "Chemistry HW", color: "bg-sky-500" },
  { date: new Date("2025-02-24"), title: "Chemistry Due", color: "bg-orange-500" },
  { date: new Date("2025-02-25"), title: "Physics Revision", color: "bg-sky-500" },
  { date: new Date("2025-02-26"), title: "Physics Exam", color: "bg-red-500" },

  // March
  { date: new Date("2025-03-03"), title: "Geography HW", color: "bg-sky-500" },
  { date: new Date("2025-03-05"), title: "Geography Due", color: "bg-orange-500" },
  { date: new Date("2025-03-06"), title: "Informatics HW", color: "bg-sky-500" },
  { date: new Date("2025-03-07"), title: "Informatics Due", color: "bg-orange-500" },
  { date: new Date("2025-03-08"), title: "Math Revision", color: "bg-sky-500" },
  { date: new Date("2025-03-09"), title: "Math Exam", color: "bg-red-500" },
  { date: new Date("2025-03-10"), title: "Physics HW", color: "bg-sky-500" },
  { date: new Date("2025-03-11"), title: "English HW", color: "bg-sky-500" },
  { date: new Date("2025-03-12"), title: "Physics Due", color: "bg-orange-500" },
  { date: new Date("2025-03-12"), title: "English Due", color: "bg-orange-500" },
  { date: new Date("2025-03-14"), title: "Chemistry Revision", color: "bg-sky-500" },
  { date: new Date("2025-03-15"), title: "Chemistry Exam", color: "bg-red-500" },
  { date: new Date("2025-03-17"), title: "Biology HW", color: "bg-sky-500" },
  { date: new Date("2025-03-18"), title: "Biology Due", color: "bg-orange-500" },
  { date: new Date("2025-03-19"), title: "History Revision", color: "bg-sky-500" },
  { date: new Date("2025-03-20"), title: "History Exam", color: "bg-red-500" },
  { date: new Date("2025-03-22"), title: "Informatics Revision", color: "bg-sky-500" },
  { date: new Date("2025-03-23"), title: "Informatics Exam", color: "bg-red-500" },

  // April
  { date: new Date("2025-04-01"), title: "Literature HW", color: "bg-sky-500" },
  { date: new Date("2025-04-02"), title: "Literature Due", color: "bg-orange-500" },
  { date: new Date("2025-04-04"), title: "Geography Revision", color: "bg-sky-500" },
  { date: new Date("2025-04-05"), title: "Geography Exam", color: "bg-red-500" },
  { date: new Date("2025-04-07"), title: "Final Math Revision", color: "bg-sky-500" },
  { date: new Date("2025-04-08"), title: "Final Math Exam", color: "bg-red-500" },
  { date: new Date("2025-04-10"), title: "Physics HW", color: "bg-sky-500" },
  { date: new Date("2025-04-11"), title: "Physics Due", color: "bg-orange-500" },
  { date: new Date("2025-04-12"), title: "Final Physics Revision", color: "bg-sky-500" },
  { date: new Date("2025-04-13"), title: "Final Physics Exam", color: "bg-red-500" },
  { date: new Date("2025-04-15"), title: "Final Chemistry Revision", color: "bg-sky-500" },
  { date: new Date("2025-04-16"), title: "Final Chemistry Exam", color: "bg-red-500" },
  { date: new Date("2025-04-18"), title: "Final English Revision", color: "bg-sky-500" },
  { date: new Date("2025-04-19"), title: "Final English Exam", color: "bg-red-500" },
  { date: new Date("2025-04-21"), title: "Final Biology Revision", color: "bg-sky-500" },
  { date: new Date("2025-04-22"), title: "Final Biology Exam", color: "bg-red-500" },
  { date: new Date("2025-04-24"), title: "Final Literature Revision", color: "bg-sky-500" },
  { date: new Date("2025-04-25"), title: "Final Literature Exam", color: "bg-red-500" }
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
            className={`p-2 min-h-[80px] flex flex-col items-start justify-start cursor-pointer transition border-t border-sky-600 
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
