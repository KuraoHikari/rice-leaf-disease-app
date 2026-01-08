import { useState, useRef, useEffect } from "react";

interface Message {
 role: string;
 content: string;
}

export function useChat() {
 const [chatInput, setChatInput] = useState("");
 const [chatHistory, setChatHistory] = useState<Message[]>([]);
 const [isChatting, setIsChatting] = useState(false);
 const scrollViewportRef = useRef<HTMLDivElement>(null);

 // Auto-scroll to bottom
 useEffect(() => {
  if (scrollViewportRef.current) {
   scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
  }
 }, [chatHistory, isChatting]);

 const handleChat = async () => {
  if (!chatInput.trim()) return;

  const userMsg = { role: "user", content: chatInput };
  const newHistory = [...chatHistory, userMsg];

  setChatHistory(newHistory);
  setChatInput("");
  setIsChatting(true);

  try {
   const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages: newHistory }),
   });

   const data = await res.json();
   setChatHistory((prev) => [...prev, { role: "assistant", content: data.reply || "No response received." }]);
  } catch (error) {
   console.error("Chat error:", error);
   setChatHistory((prev) => [...prev, { role: "assistant", content: "Failed to get response. Please try again." }]);
  } finally {
   setIsChatting(false);
  }
 };

 const initializeChatContext = (disease: string) => {
  setChatHistory([
   {
    role: "system",
    content: `You are an agricultural expert. The user has detected ${disease} on their rice plant.`,
   },
  ]);
 };

 const resetChat = () => {
  setChatHistory([]);
  setChatInput("");
 };

 return {
  chatInput,
  setChatInput,
  chatHistory,
  isChatting,
  scrollViewportRef,
  handleChat,
  initializeChatContext,
  resetChat,
 };
}
