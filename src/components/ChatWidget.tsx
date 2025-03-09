'use client';

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { BsChat } from "react-icons/bs";
import axios from "axios";

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Hi! How can I help you?', isUser: false }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Hàm chuyển đổi URL YouTube watch sang URL embed
  const extractYouTubeEmbedUrl = (text: string) => {
    const regex = /https:\/\/www\.youtube\.com\/watch\?v=([^&]+)(?:&t=(\d+)s)?/;
    const match = text.match(regex);
    if (match) {
      const videoId = match[1];
      const start = match[2] ? match[2] : "0";
      return `https://www.youtube.com/embed/${videoId}?start=${start}`;
    }
    return null;
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.get(
        "https://script.google.com/macros/s/AKfycbwveizmxcCSjHsYqWwTgmc6y9XzVnsqOZ7MjY62dxc7LN7BwhYt2bSfSUiuDmDCC6MjFw/exec?message=" + input
      );
      const data = response.data;
      const answerMessage = { text: data.answer, isUser: false };
      
      // Nếu câu hỏi chứa "why do" (không phân biệt chữ hoa chữ thường)
      if (userMessage.text.toLowerCase().includes("why do")) {
        const extraMessage = {
          text: "Here is youtube for explanation: https://www.youtube.com/watch?v=EGqpLug-sDk&t=6s",
          isUser: false
        };
        setMessages((prev) => [...prev, answerMessage, extraMessage]);
      } else {
        setMessages((prev) => [...prev, answerMessage]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Error fetching response", isUser: false }
      ]);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer fixed bottom-8 right-8 rounded-full bg-sky-500 p-4 text-3xl text-white shadow-xl"
      >
        <BsChat />
      </div>
      <motion.div
        initial={{ x: "140%" }}
        animate={{ x: isOpen ? "0%" : "140%" }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 right-4 w-148 bg-sky-50 shadow-xl rounded-lg overflow-hidden border border-sky-300"
      >
        <div className="flex items-center justify-between p-4 bg-sky-600 text-white">
          <span>AI Agent</span>
          <button
            onClick={() => setIsOpen(false)}
            className="focus:outline-none cursor-pointer"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div
          className="p-4 overflow-y-auto space-y-2"
          style={{ height: "calc(100vh - 200px)" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                msg.isUser
                  ? "bg-sky-500 text-white self-end"
                  : "bg-gray-200 text-black"
              } max-w-[75%] ${msg.isUser ? "ml-auto" : "mr-auto"}`}
            >
              {/* Nếu message của agent chứa URL YouTube, thì nhúng video */}
              {!msg.isUser && msg.text.includes("youtube.com") ? (
                <iframe
                  width="100%"
                  height="315"
                  src={extractYouTubeEmbedUrl(msg.text) || ""}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                msg.text
              )}
            </div>
          ))}
          {loading && (
            <div className="text-center text-sky-500">Loading...</div>
          )}
        </div>
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-sky-200 flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50 cursor-pointer"
          >
            <FaPaperPlane size={18} />
          </button>
        </form>
      </motion.div>
    </>
  );
};

export default ChatWidget;
