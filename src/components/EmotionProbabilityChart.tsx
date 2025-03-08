'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from 'react';

interface EmotionData {
  name: string;
  value: number;
}

const generateMockEmotionData = (): EmotionData[] => {
  return [
    { name: 'Excited', value: Math.random() * 100 },
    { name: 'Tired', value: Math.random() * 100 },
    { name: 'Angry', value: Math.random() * 100 },
    { name: 'Sad', value: Math.random() * 100 },
    { name: 'Anxious', value: Math.random() * 100 },
  ];
};

const COLORS: { [key: string]: string } = {
  'Excited': '#16a34a',
  'Tired': '#7c3aed',
  'Angry': '#dc2626',
  'Sad': '#3b82f6',
  'Anxious': '#ea580c',
};

export default function EmotionProbabilityChart() {
  const [data, setData] = useState<EmotionData[]>([]);

  useEffect(() => {
    setData(generateMockEmotionData());
  }, []);

  return (
    <div className="p-4 shadow-md border border-sky-500 bg-white rounded-2xl my-4">
      <h2 className="text-xl font-semibold text-sky-950 mb-4">Emotion Probability</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#0284c7" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#e0f2fe", borderColor: "#0ea5e9" }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
