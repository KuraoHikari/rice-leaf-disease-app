"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Activity,
  MessageSquare,
  ArrowRight,
  Github,
  ShieldCheck,
  Cpu,
  AlertTriangle,
  User,
  Upload,
  Search,
  FileText,
} from "lucide-react";
import { useModelLoader } from "@/hooks/useModelLoader";
import { useDiseasePredictor } from "@/hooks/useDiseasePredictor";
import { useChat } from "@/hooks/useChat";
import { DetectionCard } from "@/components/DetectionCard";
import { DiagnosisCard } from "@/components/DiagnosisCard";
import { ChatCard } from "@/components/ChatCard";

// -- CONSTANTS --
const CLASSES = ["Bacterial Leaf Blight", "Brown Spot", "Leaf Smut"];
const MODEL_URL = "/web_model/model.json";

export default function RiceDiseaseApp() {
  // Custom Hooks
  const { model, modelLoading, modelError } = useModelLoader(MODEL_URL);
  const {
    imageURL,
    prediction,
    confidence,
    explanation,
    isProcessing,
    imageRef,
    handleImageUpload,
    predict,
  } = useDiseasePredictor(CLASSES);
  const {
    chatInput,
    setChatInput,
    chatHistory,
    isChatting,
    scrollViewportRef,
    handleChat,
    initializeChatContext,
    resetChat,
  } = useChat();

  const appRef = useRef<HTMLDivElement>(null);

  const scrollToApp = () => {
    appRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle image upload with chat reset
  const handleImageUploadWithReset = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleImageUpload(e);
    resetChat();
  };

  // Handle prediction with chat initialization
  const handlePredict = async () => {
    const detectedDisease = await predict(model);
    if (detectedDisease) {
      initializeChatContext(detectedDisease);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold text-slate-800">
              RiceGuard AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={scrollToApp}>
              Try Demo
            </Button>
            <Link href="https://github.com" target="_blank">
              <Button variant="outline" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-linear-to-b from-green-50 to-slate-50">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            <Cpu className="h-4 w-4" />
            <span>Powered by TensorFlow.js</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight">
            Protect Your Rice Crops <br />
            <span className="text-green-600">With AI Precision</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Instant detection of Bacterial Blight, Brown Spot, and Leaf Smut.
            Upload a photo and get expert diagnosis in seconds.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="h-14 px-8 text-lg rounded-full bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20"
              onClick={scrollToApp}
            >
              Start Diagnosis <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Instant Detection
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Advanced computer vision analysis identifies crop diseases with
              high accuracy directly in your browser.
            </p>
          </div>
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Smart Diagnosis
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Get detailed explanations of symptoms and recommended treatments
              for each detected disease.
            </p>
          </div>
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">AI Assistant</h3>
            <p className="text-slate-600 leading-relaxed">
              Chat with our specialized AI to ask follow-up questions about crop
              management and disease prevention.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600 mb-4">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Upload Image</h3>
              <p className="text-sm text-slate-500">
                Take a photo or upload an image of a rice leaf showing symptoms.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">AI Analysis</h3>
              <p className="text-sm text-slate-500">
                Our model analyzes the image patterns to identify the specific
                disease.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Get Results</h3>
              <p className="text-sm text-slate-500">
                Receive an instant diagnosis with confidence score and treatment
                steps.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div className="h-12 w-12 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Consult AI</h3>
              <p className="text-sm text-slate-500">
                Ask questions to the AI assistant for deeper understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warning / Disclaimer Section */}
      <section className="py-12 px-6 bg-yellow-50 border-y border-yellow-200">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-start">
          <div className="p-3 bg-yellow-100 rounded-full shrink-0">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-yellow-800 mb-2">
              Human Verification Required
            </h3>
            <p className="text-yellow-700 leading-relaxed">
              While our AI model achieves high accuracy, it is not infallible.
              This tool is designed to assist, not replace, human expertise.
              Always verify the results with field observation or by consulting
              with an agricultural extension worker or expert before taking
              significant actions or applying treatments. Factors like lighting,
              image quality, and mixed infections can affect prediction
              accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* Main Application */}
      <section
        id="app"
        ref={appRef}
        className="py-20 px-6 bg-slate-50 min-h-screen flex flex-col items-center"
      >
        <div className="mb-12 text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Disease Detector
          </h2>
          <p className="text-slate-500">
            Upload an image of a rice leaf to begin analysis. Our model will
            identify the disease and provide actionable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          <DetectionCard
            imageURL={imageURL}
            imageRef={imageRef}
            prediction={prediction}
            confidence={confidence}
            isProcessing={isProcessing}
            modelLoading={modelLoading}
            modelError={modelError}
            onImageUpload={handleImageUploadWithReset}
            onPredict={handlePredict}
            disabled={!imageURL || !model || isProcessing || modelLoading}
          />

          <DiagnosisCard explanation={explanation} />

          <ChatCard
            chatHistory={chatHistory}
            chatInput={chatInput}
            isChatting={isChatting}
            scrollViewportRef={scrollViewportRef}
            onChatInputChange={setChatInput}
            onSendMessage={handleChat}
          />
        </div>
      </section>

      {/* Developer Profile */}
      <section className="py-20 px-6 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            About the Developer
          </h2>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm inline-block w-full md:w-auto min-w-[320px]">
            <div className="h-24 w-24 bg-linear-to-br from-green-100 to-green-200 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-sm">
              <User className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              Dewa Gede Indra Putra
            </h3>
            <p className="text-green-600 font-medium mb-6">
              Informatics Student at Primakara University
            </p>
            <p className="text-slate-600 mb-8 max-w-sm mx-auto leading-relaxed text-sm">
              This project is built as a Final Year Assessment (UAS) for the
              Machine Learning course. My goal is to leverage AI technology to
              solve real-world agricultural challenges.
            </p>
            <div className="flex flex-col items-center gap-3">
              <span className="px-4 py-2 bg-white rounded-lg border border-slate-200 text-slate-600 text-sm font-mono shadow-sm">
                NIM: 2201020030
              </span>
              <div className="flex gap-4 mt-2">
                <Link
                  href="https://github.com/dewaindra705"
                  target="_blank"
                  className="text-slate-400 hover:text-slate-800 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-sm">
          <p>© 2024 RiceGuard AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-slate-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-800 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
