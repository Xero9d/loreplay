"use client";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bienvenido a Skyrim, viajero. El viento frío del norte azota las montañas mientras llegas a las tierras de los Nórdicos. ¿Quién eres y qué te trae a estas tierras?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await response.json();
    setMessages([...newMessages, { role: "assistant", content: data.message }]);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-amber-500">⚔️ LorePlay — Skyrim</h1>
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-6 flex flex-col gap-4 h-[600px]">
        <div className="flex-1 overflow-y-auto flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div key={i} className={`p-3 rounded-lg ${msg.role === "assistant" ? "bg-gray-700 text-amber-100" : "bg-amber-900 text-white self-end"}`}>
              {msg.content}
            </div>
          ))}
          {loading && <div className="text-amber-400 italic">El narrador escribe...</div>}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 bg-gray-700 rounded-lg p-3 text-white outline-none"
            placeholder="¿Qué haces?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-amber-600 hover:bg-amber-500 px-6 rounded-lg font-bold"
          >
            Enviar
          </button>
        </div>
      </div>
    </main>
  );
}