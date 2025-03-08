'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface EmotionData {
  emotion: string;
  value: number;
}

interface EmotionRaw {
  emotion: string;
  value: string;
}

const COLORS: { [key: string]: string } = {
  'Excited': '#16a34a',
  'Tired': '#7c3aed',
  'Angry': '#dc2626',
  'Sad': '#3b82f6',
  'Anxious': '#ea580c',
  'Neutral': '#c3c3c3',
};

export default function EmotionProbabilityChart() {
  const [data, setData] = useState<EmotionData[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("https://script.google.com/macros/s/AKfycbwveizmxcCSjHsYqWwTgmc6y9XzVnsqOZ7MjY62dxc7LN7BwhYt2bSfSUiuDmDCC6MjFw/exec?b=true");
      const rawData = response.data;

        const processedData: EmotionData[] = rawData.map((item: EmotionRaw) => ({
          emotion: item.emotion,
          value: Number(item.value),
        }));

        setData(processedData);
    };

    getData();
  }, []);

  return (
    <div className="p-4 shadow-md border border-sky-500 bg-white rounded-2xl my-4">
      <h2 className="text-xl font-semibold text-sky-950 mb-4">Emotion Probability</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="emotion" cx="50%" cy="50%" outerRadius={100} fill="#0284c7" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.emotion]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#e0f2fe", borderColor: "#0ea5e9" }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
