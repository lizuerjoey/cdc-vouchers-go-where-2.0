"use client";

import { FormEvent, useState } from "react";
import { Bot, Loader2, Send, Sparkles, User } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts = [
  "Where can I get brunch near Tampines?",
  "Find lash lift places that take vouchers",
  "Any restaurants good for family dinner?",
];

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I can recommend merchants from the v1 seeded CDC voucher dataset. Try asking by neighbourhood, food type, or beauty service.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submitMessage(nextInput?: string) {
    const content = (nextInput ?? input).trim();
    if (!content || isLoading) {
      return;
    }

    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const payload = (await response.json()) as { content: string };
      setMessages([...nextMessages, { role: "assistant", content: payload.content }]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "I could not reach the recommendation service. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitMessage();
  }

  return (
    <aside className="flex h-full min-h-[560px] flex-col rounded-lg border border-gov-line bg-white shadow-panel">
      <div className="border-b border-gov-line p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded bg-gov-blue text-white">
            <Sparkles size={20} aria-hidden />
          </span>
          <div>
            <h2 className="text-lg font-bold text-gov-ink">Ask for recommendations</h2>
            <p className="text-sm text-slate-600">Grounded in seeded merchants</p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className="flex gap-3">
            <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded bg-gov-mist text-gov-blue">
              {message.role === "assistant" ? <Bot size={17} aria-hidden /> : <User size={17} aria-hidden />}
            </span>
            <p className="whitespace-pre-line rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">
              {message.content}
            </p>
          </div>
        ))}
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm font-semibold text-gov-blue">
            <Loader2 className="animate-spin" size={16} aria-hidden />
            Finding grounded matches
          </div>
        ) : null}
      </div>

      <div className="border-t border-gov-line p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {starterPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => void submitMessage(prompt)}
              className="rounded border border-gov-line px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:border-gov-blue hover:text-gov-blue"
            >
              {prompt}
            </button>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask for cafes, dinner, brows..."
            className="min-w-0 flex-1 rounded border border-gov-line px-3 text-sm"
          />
          <button
            type="submit"
            className="grid h-11 w-11 shrink-0 place-items-center rounded bg-gov-red text-white transition hover:bg-red-700"
            aria-label="Send recommendation request"
          >
            <Send size={18} aria-hidden />
          </button>
        </form>
      </div>
    </aside>
  );
}
