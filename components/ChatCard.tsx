import { Bot, Send, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
 role: string;
 content: string;
}

interface ChatCardProps {
 chatHistory: Message[];
 chatInput: string;
 isChatting: boolean;
 scrollViewportRef: React.RefObject<HTMLDivElement | null>;
 onChatInputChange: (value: string) => void;
 onSendMessage: () => void;
}

export function ChatCard({ chatHistory, chatInput, isChatting, scrollViewportRef, onChatInputChange, onSendMessage }: ChatCardProps) {
 const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter" && !e.shiftKey) {
   e.preventDefault();
   onSendMessage();
  }
 };

 return (
  <Card className="flex flex-col h-full shadow-lg border-slate-200">
   <CardHeader className="border-b">
    <CardTitle className="flex items-center gap-2">
     <Bot className="w-5 h-5 text-blue-600" /> AI Assistant
    </CardTitle>
   </CardHeader>
   <CardContent className="flex-1 flex flex-col p-0">
    {/* Chat History */}
    <ScrollArea className="flex-1 p-4 h-20">
     <div className="space-y-4 h-52" ref={scrollViewportRef}>
      {chatHistory.filter((m) => m.role !== "system").length === 0 && (
       <div className="flex items-center justify-center h-[400px]">
        <p className="text-sm text-slate-400 text-center">Ask me anything about the diagnosis or treatment!</p>
       </div>
      )}
      {chatHistory
       .filter((m) => m.role !== "system")
       .map((msg, i) => (
        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
         <div
          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-sm" : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm"}`}
         >
          <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.content}</p>
         </div>
        </div>
       ))}
      {isChatting && (
       <div className="flex justify-start">
        <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
         <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
         </div>
        </div>
       </div>
      )}
     </div>
    </ScrollArea>

    {/* Chat Input */}
    <div className="p-4 bg-white border-t border-slate-200 flex gap-2 shrink-0">
     <Input value={chatInput} onChange={(e) => onChatInputChange(e.target.value)} placeholder="Type your question..." onKeyDown={handleKeyDown} className="flex-1" disabled={isChatting} />
     <Button size="icon" onClick={onSendMessage} disabled={isChatting || !chatInput.trim()} className="shrink-0">
      {isChatting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
     </Button>
    </div>
   </CardContent>
  </Card>
 );
}
