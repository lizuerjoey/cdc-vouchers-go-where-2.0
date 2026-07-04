import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

import { retrieveMerchantsForPrompt } from "@/lib/merchant-search";

export const maxDuration = 30;

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(request: Request) {
  const { messages = [] } = (await request.json()) as { messages?: ChatMessage[] };
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
  const retrievedMerchants = retrieveMerchantsForPrompt(latestUserMessage);

  if (!process.env.OPENAI_API_KEY) {
    const fallback = buildFallbackResponse(latestUserMessage, retrievedMerchants);
    return Response.json({ content: fallback, merchants: retrievedMerchants });
  }

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    system: [
      "You are a friendly CDC voucher merchant recommendation assistant.",
      "Only recommend merchants from the provided dataset.",
      "If the dataset does not contain a matching merchant, say so and suggest the closest available filters.",
      "Keep answers concise and mention merchant names, district, why they fit, and opening hours.",
      `Merchant dataset: ${JSON.stringify(retrievedMerchants)}`,
    ].join("\n"),
    messages,
  });

  return Response.json({ content: result.text, merchants: retrievedMerchants });
}

function buildFallbackResponse(prompt: string, merchants: ReturnType<typeof retrieveMerchantsForPrompt>) {
  const intro = prompt
    ? `I found a few seeded merchants that may fit "${prompt}".`
    : "Tell me what you are looking for and I can recommend seeded merchants.";

  const recommendations = merchants
    .slice(0, 3)
    .map((merchant) => `- ${merchant.name} in ${merchant.district}: ${merchant.description} Hours: ${merchant.openingHours}.`)
    .join("\n");

  return `${intro}\n\n${recommendations}\n\nThese recommendations are grounded in the local v1 seed dataset. Add OPENAI_API_KEY to enable streamed AI responses.`;
}
