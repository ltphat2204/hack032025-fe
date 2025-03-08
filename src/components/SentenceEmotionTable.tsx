"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface SentenceData {
  sentence: string;
  emotion: string;
}

const COLORS: { [key: string]: string } = {
    'Happy': '#16a34a',
    'Tired': '#7c3aed',
    'Angry': '#dc2626',
    'Sad': '#3b82f6',
    'Anxious': '#ea580c',
    'Neutral': '#c3c3c3',
};

export default function SentenceTable() {
    const [sentences, setSentences] = useState<SentenceData[]>([]);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get("https://script.google.com/macros/s/AKfycbwveizmxcCSjHsYqWwTgmc6y9XzVnsqOZ7MjY62dxc7LN7BwhYt2bSfSUiuDmDCC6MjFw/exec?a=true");
            const data = response.data as SentenceData[];
            setSentences(data);
        }
        getData();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-4 shadow-md border border-sky-500 bg-white rounded-2xl flex-1/2">
            <h2 className="text-xl font-semibold text-sky-600 mb-4">Sentence & Emotion Table</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-sky-100">
                        <tr className="border-b border-gray-300">
                            <th className="px-4 py-2 w-3/4 text-left">Sentence</th>
                            <th className="px-4 py-2 w-1/4 text-left">Emotion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sentences.map((item, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-300`}>
                            <td className="px-4 py-2 flex items-start gap-1">
                                <span className="break-words">{item.sentence}</span>
                            </td>
                            <td className="px-4 py-2" style={{ color: COLORS[item.emotion] }}>
                                {item.emotion}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}