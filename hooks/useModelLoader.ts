import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

export function useModelLoader(modelUrl: string) {
 const [model, setModel] = useState<tf.LayersModel | null>(null);
 const [modelLoading, setModelLoading] = useState(true);
 const [modelError, setModelError] = useState<string | null>(null);

 useEffect(() => {
  const loadModel = async () => {
   try {
    setModelLoading(true);
    await tf.ready();
    const loadedModel = await tf.loadLayersModel(modelUrl);
    setModel(loadedModel);
    setModelLoading(false);
    console.log("TFJS Model Loaded");
   } catch (err) {
    console.error("Failed to load model", err);
    setModelError(err instanceof Error ? err.message : "Failed to load model");
    setModelLoading(false);
   }
  };
  loadModel();
 }, [modelUrl]);

 return { model, modelLoading, modelError };
}
