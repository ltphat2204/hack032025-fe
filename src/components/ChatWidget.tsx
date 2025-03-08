'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { BsChat } from "react-icons/bs";

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwo9j76zMVzO02nkZXLE82fXT-eQQ07H4WED2UXO9FLTxzmWz1HBnzsyqPC_f64yRTo7Q/exec?=null", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.answer, isUser: false }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error fetching response", isUser: false }]);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <div onClick={()=>setIsOpen(true)} className="cursor-pointer fixed bottom-8 right-8 rounded-full bg-sky-500 p-4 text-3xl text-white shadow-xl">
            <BsChat/>
        </div>
        <motion.div
            initial={{ x: "140%" }}
            animate={{ x: isOpen ? "0%" : "140%" }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 w-80 bg-sky-50 shadow-xl rounded-lg overflow-hidden border border-sky-300"
        >
        <div className="flex items-center justify-between p-4 bg-sky-600 text-white">
            <span>AI Agent</span>
            <button onClick={()=>setIsOpen(false)} className="focus:outline-none cursor-pointer">
                <FaTimes size={20} />
            </button>
        </div>
        <div className="p-4 h-64 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
            <div
                key={index}
                className={`p-2 rounded-lg ${
                msg.isUser ? "bg-sky-500 text-white self-end" : "bg-gray-200 text-black"
                } max-w-[75%] ${msg.isUser ? "ml-auto" : "mr-auto"}`}
            >
                {msg.text}
            </div>
            ))}
            {loading && <div className="text-center text-sky-500">Loading...</div>}
        </div>
        <div className="p-4 border-t border-sky-200 flex items-center gap-2">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
                onClick={handleSendMessage}
                disabled={loading}
                className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50 cursor-pointer"
            >
            <FaPaperPlane size={18} />
            </button>
        </div>
        </motion.div>
    </>
  );
};

export default ChatWidget;
