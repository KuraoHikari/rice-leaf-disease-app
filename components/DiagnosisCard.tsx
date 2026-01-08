import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface DiagnosisCardProps {
 explanation: string;
}

export function DiagnosisCard({ explanation }: DiagnosisCardProps) {
 return (
  <Card className="flex flex-col h-full shadow-lg border-slate-200">
   <CardHeader className="border-b">
    <CardTitle className="flex items-center gap-2">
     <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">i</div>
     Diagnosis Report
    </CardTitle>
   </CardHeader>
   <CardContent className="flex-1 p-6">
    <Textarea
     readOnly
     value={explanation || "Awaiting prediction... The diagnosis details will appear here."}
     className="w-full h-full resize-none text-base leading-relaxed bg-white border-none focus-visible:ring-0 shadow-none p-0"
    />
   </CardContent>
  </Card>
 );
}
