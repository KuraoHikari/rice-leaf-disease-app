import { useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";

export function useDiseasePredictor(classes: string[]) {
 const [imageURL, setImageURL] = useState<string | null>(null);
 const [prediction, setPrediction] = useState<string | null>(null);
 const [confidence, setConfidence] = useState<number>(0);
 const [explanation, setExplanation] = useState<string>("");
 const [isProcessing, setIsProcessing] = useState(false);
 const imageRef = useRef<HTMLImageElement>(null);

 const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
   const url = URL.createObjectURL(e.target.files[0]);
   setImageURL(url);
   setPrediction(null);
   setExplanation("");
  }
 };

 const fetchExplanation = async (diseaseName: string) => {
  try {
   const res = await fetch("/api/explain", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({ disease: diseaseName }),
   });
   const data = await res.json();
   setExplanation(data.text || "No explanation available.");
  } catch (error) {
   console.error("Fetch explanation error:", error);
   setExplanation("Failed to load explanation. Please check your API key and try again.");
  }
 };

 const predict = async (model: tf.LayersModel | null) => {
  if (!model || !imageRef.current) return null;
  setIsProcessing(true);

  try {
   // Preprocessing image
   const tensor = tf.browser.fromPixels(imageRef.current).resizeNearestNeighbor([224, 224]).toFloat().div(tf.scalar(255.0)).expandDims();

   const predictionResult = (await model.predict(tensor)) as tf.Tensor;
   const data = await predictionResult.data();

   // Get max value index
   const maxConfidence = Math.max(...Array.from(data));
   const classIndex = data.indexOf(maxConfidence);

   const resultClass = classes[classIndex];
   setPrediction(resultClass);
   setConfidence(maxConfidence);

   // Clean up tensors
   tensor.dispose();
   predictionResult.dispose();

   // Get Explanation from AI
   await fetchExplanation(resultClass);

   return resultClass;
  } catch (error) {
   console.error("Prediction error:", error);
   return null;
  } finally {
   setIsProcessing(false);
  }
 };

 return {
  imageURL,
  prediction,
  confidence,
  explanation,
  isProcessing,
  imageRef,
  handleImageUpload,
  predict,
 };
}
