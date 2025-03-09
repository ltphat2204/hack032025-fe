"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface SentenceData {
  sentence: string;
  emotion: string;
}

const COLORS: { [key: string]: string } = {
  Happy: "#16a34a",
  Tired: "#7c3aed",
  Angry: "#dc2626",
  Sad: "#3b82f6",
  Anxious: "#ea580c",
  Neutral: "#c3c3c3",
};

export default function SentenceTable() {
  const [sentences, setSentences] = useState<SentenceData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số dòng mỗi trang

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://script.google.com/macros/s/AKfycbwveizmxcCSjHsYqWwTgmc6y9XzVnsqOZ7MjY62dxc7LN7BwhYt2bSfSUiuDmDCC6MjFw/exec?a=true"
        );
        const data = response.data as SentenceData[];
        setSentences(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch ngay khi component được mount
    getData();
    // Thiết lập interval fetch dữ liệu mỗi 3 giây
    const intervalId = setInterval(() => {
      getData();
    }, 3000);

    // Cleanup interval khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Đảo ngược mảng để hiển thị theo thứ tự mới nhất trước
  const reversedSentences = sentences.slice().reverse();
  // Tính toán chỉ số bắt đầu và kết thúc cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reversedSentences.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sentences.length / itemsPerPage);

  return (
    <div className="max-w-3xl mx-auto p-4 shadow-md border border-sky-500 bg-white rounded-2xl flex-1/2">
      <h2 className="text-xl font-semibold text-sky-600 mb-4">
        Sentence & Emotion Table
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-sky-100">
            <tr className="border-b border-gray-300">
              <th className="px-4 py-2 w-3/4 text-left">Sentence</th>
              <th className="px-4 py-2 w-1/4 text-left">Emotion</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-b border-gray-300`}
              >
                <td className="px-4 py-2 flex items-start gap-1">
                  <span className="break-words">{item.sentence}</span>
                </td>
                <td
                  className="px-4 py-2"
                  style={{ color: COLORS[item.emotion] }}
                >
                  {item.emotion}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Phân trang */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-sky-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
