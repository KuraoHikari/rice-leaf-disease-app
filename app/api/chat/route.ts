import { NextResponse } from "next/server";

export async function POST(req: Request) {
 const { messages } = await req.json();

 try {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
   method: "POST",
   headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "RiceGuard AI",
   },
   body: JSON.stringify({
    model: "openai/gpt-4o-mini-2024-07-18",
    messages: messages,
   }),
  });

  if (!response.ok) {
   const errorData = await response.json();
   console.error("OpenRouter API Error:", errorData);
   return NextResponse.json({ reply: `API Error: ${errorData.error?.message || response.statusText}` });
  }

  const data = await response.json();
  return NextResponse.json({ reply: data.choices?.[0]?.message?.content });
 } catch (error) {
  console.error("Chat API Error:", error);
  return NextResponse.json({ reply: `Error: ${error instanceof Error ? error.message : "Chat error"}` });
 }
}
