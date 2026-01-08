import { Camera, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface DetectionCardProps {
 imageURL: string | null;
 imageRef: React.RefObject<HTMLImageElement | null>;
 prediction: string | null;
 confidence: number;
 isProcessing: boolean;
 modelLoading: boolean;
 modelError: string | null;
 onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
 onPredict: () => void;
 disabled: boolean;
}

export function DetectionCard({ imageURL, imageRef, prediction, confidence, isProcessing, modelLoading, modelError, onImageUpload, onPredict, disabled }: DetectionCardProps) {
 return (
  <Card className="flex flex-col h-full shadow-lg border-slate-200">
   <CardHeader className=" border-b">
    <CardTitle className="flex items-center gap-2">
     <Camera className="w-5 h-5" /> Detection
    </CardTitle>
   </CardHeader>
   <CardContent className="flex-1 flex flex-col p-6 gap-4">
    {/* Image Preview Area */}
    <div className="flex-1 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative">
     {imageURL ? (
      <img ref={imageRef} src={imageURL} alt="Upload" className="w-full h-full object-contain" crossOrigin="anonymous" />
     ) : (
      <div className="text-slate-400 text-center">
       <Upload className="w-10 h-10 mx-auto mb-2 opacity-50" />
       <p>Upload or take a photo</p>
      </div>
     )}
    </div>

    <Input type="file" accept="image/*" onChange={onImageUpload} className="cursor-pointer" />

    <Button onClick={onPredict} disabled={disabled} className="w-full bg-green-600 hover:bg-green-700 text-white">
     {modelLoading ? (
      <>
       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading Model...
      </>
     ) : isProcessing ? (
      <>
       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
      </>
     ) : (
      "Predict Disease"
     )}
    </Button>

    {modelError && (
     <div className="bg-red-50 p-3 rounded-md border border-red-200 text-center">
      <p className="text-sm text-red-800">Model Error: {modelError}</p>
     </div>
    )}

    {prediction && (
     <div className="bg-green-50 p-3 rounded-md border border-green-200 text-center">
      <p className="text-sm text-green-800 font-semibold">Detected:</p>
      <h2 className="text-xl font-bold text-green-900">{prediction}</h2>
      <Badge variant="outline" className="mt-1 bg-white">
       Confidence: {(confidence * 100).toFixed(1)}%
      </Badge>
     </div>
    )}
   </CardContent>
  </Card>
 );
}
