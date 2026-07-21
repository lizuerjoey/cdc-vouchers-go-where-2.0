"use client";

import { FormEvent, ReactNode, useState } from "react";
import { Bot, KeyRound, LockKeyhole, Loader2, Send, Sparkles, User } from "lucide-react";

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
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I can recommend merchants from the v1 seeded CDC voucher dataset. Try asking by neighbourhood, food type, or beauty service.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unlockError, setUnlockError] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);

  async function submitMessage(nextInput?: string) {
    const content = (nextInput ?? input).trim();
    if (!content || isLoading || !isUnlocked) {
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
        body: JSON.stringify({ messages: nextMessages, password }),
      });
      if (response.status === 401) {
        setIsUnlocked(false);
        setPassword("");
        setPasswordInput("");
        setMessages([
          ...nextMessages,
          {
            role: "assistant",
            content: "That password did not unlock the recommendations.",
          },
        ]);
        return;
      }
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

  async function onUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextPassword = passwordInput.trim();
    if (!nextPassword) {
      setUnlockError("Key in the password first, then the recommendations can come out to play.");
      return;
    }

    setIsUnlocking(true);
    setUnlockError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: nextPassword, verifyOnly: true }),
      });

      if (!response.ok) {
        setUnlockError("That password did not unlock the recommendations. Contact us @lizuer.joey@gmail.com for the password.");
        return;
      }

      setPassword(nextPassword);
      setIsUnlocked(true);
    } catch {
      setUnlockError("I could not check the password just now. Please try again in a moment.");
    } finally {
      setIsUnlocking(false);
    }
  }

  return (
    <aside className="flex h-full min-h-[560px] flex-col overflow-hidden rounded-2xl border border-gov-line bg-white shadow-panel">
      <div className="border-b border-blue-900/10 bg-gov-navy p-5 text-white">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-gov-sky ring-1 ring-white/15">
            <Sparkles size={20} aria-hidden />
          </span>
          <div>
            <h2 className="text-lg font-bold text-white">Your neighbourhood guide</h2>
            <p className="text-sm text-blue-100/70">Smart, grounded recommendations</p>
          </div>
        </div>
      </div>

      {isUnlocked ? (
        <>
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className="flex gap-3">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-gov-blue">
                  {message.role === "assistant" ? <Bot size={17} aria-hidden /> : <User size={17} aria-hidden />}
                </span>
                <div className="rounded-2xl rounded-tl-sm bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                  <FormattedMessage content={message.content} />
                </div>
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
                  className="rounded-xl border border-gov-line bg-slate-50 px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:border-gov-blue hover:bg-blue-50 hover:text-gov-blue"
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
                className="min-w-0 flex-1 rounded-xl border border-gov-line bg-slate-50 px-3 text-sm focus:bg-white"
              />
              <button
                type="submit"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gov-red text-white transition hover:bg-red-700"
                aria-label="Send recommendation request"
              >
                <Send size={18} aria-hidden />
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col justify-center gap-5 p-5">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-gov-blue shadow-sm">
                <LockKeyhole size={18} aria-hidden />
              </span>
              <p className="text-sm font-semibold leading-6 text-gov-ink">
                Unlock personalised recommendations
              </p>
            </div>
            <p className="text-sm leading-6 text-slate-600">This prototype feature is password protected. Contact the project team for access.</p>
          </div>
          <form onSubmit={onUnlock} className="flex gap-2">
            <input
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              placeholder="Enter password"
              type="password"
              className="min-w-0 flex-1 rounded-xl border border-gov-line bg-slate-50 px-3 text-sm focus:bg-white"
              aria-label="Recommendation password"
            />
            <button
              type="submit"
              disabled={isUnlocking}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gov-red text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              aria-label="Unlock recommendations"
            >
              {isUnlocking ? <Loader2 className="animate-spin" size={18} aria-hidden /> : <KeyRound size={18} aria-hidden />}
            </button>
          </form>
          {unlockError ? <p className="text-sm font-semibold leading-6 text-gov-red">{unlockError}</p> : null}
        </div>
      )}
    </aside>
  );
}

function FormattedMessage({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/);

  return (
    <div className="space-y-4">
      {blocks.map((block, blockIndex) => {
        const lines = block.split("\n").filter((line) => line.trim());
        const listItems = lines.map(parseListLine);
        const isList = listItems.every(Boolean);

        if (isList) {
          const isNumbered = listItems.every((item) => item?.type === "number");
          const ListTag = isNumbered ? "ol" : "ul";

          return (
            <ListTag key={`${block}-${blockIndex}`} className={isNumbered ? "list-decimal space-y-1 pl-5" : "list-disc space-y-1 pl-5"}>
              {listItems.map((item, itemIndex) => (
                <li key={`${item?.content}-${itemIndex}`}>{formatInlineMarkdown(item?.content ?? "")}</li>
              ))}
            </ListTag>
          );
        }

        return (
          <p key={`${block}-${blockIndex}`}>
            {lines.map((line, lineIndex) => (
              <span key={`${line}-${lineIndex}`}>
                {lineIndex > 0 ? <br /> : null}
                {formatInlineMarkdown(line)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function parseListLine(line: string) {
  const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
  if (numberedMatch) {
    return { type: "number" as const, content: numberedMatch[2] };
  }

  const bulletMatch = line.match(/^[-*]\s+(.*)$/);
  if (bulletMatch) {
    return { type: "bullet" as const, content: bulletMatch[1] };
  }

  return null;
}

function formatInlineMarkdown(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[\s\S]+?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}
