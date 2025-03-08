'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

interface FocusData {
  date: string;
  focusTime: number;
}

const generateMockData = (): FocusData[] => {
  const data: FocusData[] = [];
  const focusTimes = {
    weekday: [0, 1, 2, 3, 4],
    weekend: [4, 5, 6, 7] 
  };

  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      focusTime: isWeekend 
        ? focusTimes.weekend[Math.floor(Math.random() * focusTimes.weekend.length)]
        : focusTimes.weekday[Math.floor(Math.random() * focusTimes.weekday.length)]
    });
  }
  
  return data;
};

export default function FocusTimeChart() {
  const [data, setData] = useState<FocusData[]>([]);

  useEffect(() => {
    setData(generateMockData());
  }, []);

  return (
    <div className="p-4 shadow-md border border-sky-500 bg-white rounded-2xl">
      <h2 className="text-xl font-semibold text-sky-950 mb-4">Focus Time (Last 14 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#0ea5e9" />
          <YAxis stroke="#0ea5e9" />
          <Tooltip contentStyle={{ backgroundColor: "#e0f2fe", borderColor: "#0ea5e9" }} />
          <Line type="monotone" dataKey="focusTime" stroke="#0284c7" strokeWidth={2} dot={{ fill: "#0284c7" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}