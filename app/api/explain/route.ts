import { NextResponse } from "next/server";

export async function POST(req: Request) {
 const { disease } = await req.json();

 if (!disease) return NextResponse.json({ error: "No disease provided" }, { status: 400 });

 const prompt = `Explain the rice leaf disease "${disease}". Cover symptoms, causes, and basic treatment. Keep it concise (max 150 words).`;

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
    messages: [{ role: "user", content: prompt }],
   }),
  });

  if (!response.ok) {
   const errorData = await response.json();
   console.error("OpenRouter API Error:", errorData);
   return NextResponse.json({ text: `API Error: ${errorData.error?.message || response.statusText}` });
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "Failed to fetch explanation.";
  return NextResponse.json({ text });
 } catch (error) {
  console.error("API Error:", error);
  return NextResponse.json({ text: `Error: ${error instanceof Error ? error.message : "Failed to connect to AI"}` });
 }
}
