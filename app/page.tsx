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
  BookOpen,
  Code,
  Database,
  TrendingUp,
  ExternalLink,
  Layers,
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
            <Link
              href="https://github.com/kuraohikari/rice-leaf-disease-app"
              target="_blank"
            >
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

      {/* Technical Documentation Section */}
      <section className="py-20 px-6 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Technical Documentation
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Deep dive into the CNN architecture, model conversion process, and
              training results
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Link
                href="https://colab.research.google.com/github/kuraohikari/rice-leaf-disease-app/blob/main/ModelTrainCode/RiceLeafDiseases.ipynb"
                target="_blank"
              >
                <Button variant="outline" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  View Colab Notebook
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
              <Link
                href="https://github.com/kuraohikari/rice-leaf-disease-app"
                target="_blank"
              >
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  GitHub Repository
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
              <Link
                href="https://www.kaggle.com/datasets/vbookshelf/rice-leaf-diseases"
                target="_blank"
              >
                <Button variant="outline" className="gap-2">
                  <Database className="h-4 w-4" />
                  Kaggle Dataset
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>

          {/* CNN Architecture */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <Layers className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    CNN Model Architecture
                  </h3>
                  <p className="text-slate-600">
                    Custom Convolutional Neural Network with 3 conv blocks and
                    dropout regularization
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
                <div className="font-mono text-sm space-y-2 text-slate-700">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <span className="text-blue-600 font-semibold">
                      Input Layer:
                    </span>
                    <span>(224, 224, 3) RGB Image</span>
                  </div>
                  <div className="pl-4 space-y-1 border-l-2 border-blue-200 ml-4">
                    <div className="p-2 bg-blue-50 rounded">
                      → Conv2D: 32 filters, 3×3, ReLU
                    </div>
                    <div className="p-2 bg-blue-50 rounded">
                      → MaxPooling2D: 2×2
                    </div>
                    <div className="p-2 bg-indigo-50 rounded">
                      → Conv2D: 64 filters, 3×3, ReLU
                    </div>
                    <div className="p-2 bg-indigo-50 rounded">
                      → MaxPooling2D: 2×2
                    </div>
                    <div className="p-2 bg-purple-50 rounded">
                      → Conv2D: 128 filters, 3×3, ReLU
                    </div>
                    <div className="p-2 bg-purple-50 rounded">
                      → MaxPooling2D: 2×2
                    </div>
                    <div className="p-2 bg-yellow-50 rounded">
                      → Dropout: 0.25
                    </div>
                    <div className="p-2 bg-green-50 rounded">→ Flatten</div>
                    <div className="p-2 bg-green-50 rounded">
                      → Dense: 128 units, ReLU
                    </div>
                    <div className="p-2 bg-yellow-50 rounded">
                      → Dropout: 0.5
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-600 font-semibold">
                      Output Layer:
                    </span>
                    <span>Dense: 3 units, Softmax (3 disease classes)</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Optimizer</p>
                    <p className="font-semibold text-slate-900">
                      Adam (lr=0.001)
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Loss Function</p>
                    <p className="font-semibold text-slate-900">
                      Sparse Categorical Crossentropy
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">
                      Total Parameters
                    </p>
                    <p className="font-semibold text-slate-900">
                      ~1.2M trainable
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Input Size</p>
                    <p className="font-semibold text-slate-900">224×224×3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Model Training Results */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-green-600 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Training Results
                  </h3>
                  <p className="text-slate-600">
                    Comparison of 3 models trained with different epochs on Rice
                    Leaf Diseases Dataset
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
                  <div className="text-center mb-4">
                    <div className="inline-block px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold mb-2">
                      Model 1
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      10 Epochs
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">Accuracy</span>
                      <span className="font-bold text-blue-600">~94%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">Val Loss</span>
                      <span className="font-bold text-slate-900">~0.20</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">F1-Score</span>
                      <span className="font-bold text-slate-900">~0.94</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
                  <div className="text-center mb-4">
                    <div className="inline-block px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-semibold mb-2">
                      Model 2
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      20 Epochs
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">Accuracy</span>
                      <span className="font-bold text-purple-600">~96%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">Val Loss</span>
                      <span className="font-bold text-slate-900">~0.15</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">F1-Score</span>
                      <span className="font-bold text-slate-900">~0.96</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-6 shadow-sm border-2 border-green-500 relative">
                  <div className="absolute -top-3 -right-3 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                    BEST
                  </div>
                  <div className="text-center mb-4">
                    <div className="inline-block px-4 py-2 bg-green-600 text-white rounded-full font-semibold mb-2">
                      Model 3
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      30 Epochs
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-sm text-slate-600">Accuracy</span>
                      <span className="font-bold text-green-600">96%+</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-sm text-slate-600">Val Loss</span>
                      <span className="font-bold text-slate-900">~0.12</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-sm text-slate-600">F1-Score</span>
                      <span className="font-bold text-slate-900">~0.96</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
                <h4 className="font-bold text-slate-900 mb-4">
                  Dataset Information
                </h4>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Source</p>
                    <p className="font-semibold text-slate-900">Kaggle</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Classes</p>
                    <p className="font-semibold text-slate-900">3 Diseases</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Split</p>
                    <p className="font-semibold text-slate-900">
                      80/20 Train/Val
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Batch Size</p>
                    <p className="font-semibold text-slate-900">32</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Model Conversion Process */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-purple-600 rounded-xl">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    H5 to TensorFlow.js Conversion
                  </h3>
                  <p className="text-slate-600">
                    Critical steps to convert Keras model for browser deployment
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 bg-purple-600 text-white rounded-full text-xs">
                      1
                    </span>
                    Install Required Versions
                  </h4>
                  <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-green-400 font-mono">
                      pip install tensorflow==2.16.2 tensorflowjs==4.22.0
                    </code>
                  </div>
                  <p className="text-sm text-slate-600 mt-3">
                    ⚠️ <strong>Critical:</strong> TensorFlow 2.16.2 and
                    TensorFlow.js 4.22.0 are required for compatibility. Keras 3
                    format is not compatible with TensorFlow.js without Legacy
                    H5 format.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 bg-purple-600 text-white rounded-full text-xs">
                      2
                    </span>
                    Save Model in Legacy H5 Format
                  </h4>
                  <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-green-400 font-mono block mb-1">
                      # Save with explicit H5 format
                    </code>
                    <code className="text-sm text-blue-400 font-mono">
                      model.save(&apos;riceleaf_model.h5&apos;,
                      save_format=&apos;h5&apos;)
                    </code>
                  </div>
                  <p className="text-sm text-slate-600 mt-3">
                    The{" "}
                    <code className="px-2 py-1 bg-slate-100 rounded text-xs">
                      save_format=&apos;h5&apos;
                    </code>{" "}
                    ensures Keras 2 Legacy format with{" "}
                    <code className="px-2 py-1 bg-slate-100 rounded text-xs">
                      inbound_nodes
                    </code>{" "}
                    property that TensorFlow.js requires.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 bg-purple-600 text-white rounded-full text-xs">
                      3
                    </span>
                    Convert to TensorFlow.js Format
                  </h4>
                  <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-green-400 font-mono block mb-1">
                      tensorflowjs_converter \
                    </code>
                    <code className="text-sm text-blue-400 font-mono block mb-1 pl-4">
                      --input_format=keras \
                    </code>
                    <code className="text-sm text-blue-400 font-mono block mb-1 pl-4">
                      --output_format=tfjs_layers_model \
                    </code>
                    <code className="text-sm text-blue-400 font-mono block mb-1 pl-4">
                      riceleaf_model.h5 \
                    </code>
                    <code className="text-sm text-blue-400 font-mono block pl-4">
                      web_model/
                    </code>
                  </div>
                  <p className="text-sm text-slate-600 mt-3">
                    This generates{" "}
                    <code className="px-2 py-1 bg-slate-100 rounded text-xs">
                      model.json
                    </code>{" "}
                    and weight shards (
                    <code className="px-2 py-1 bg-slate-100 rounded text-xs">
                      .bin
                    </code>
                    ) compatible with browser runtime.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 bg-purple-600 text-white rounded-full text-xs">
                      4
                    </span>
                    Deploy to Public Folder
                  </h4>
                  <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-green-400 font-mono block mb-1">
                      # Copy to Next.js public directory
                    </code>
                    <code className="text-sm text-blue-400 font-mono">
                      cp -r web_model/ public/web_model/
                    </code>
                  </div>
                  <p className="text-sm text-slate-600 mt-3">
                    The model is now accessible at{" "}
                    <code className="px-2 py-1 bg-slate-100 rounded text-xs">
                      /web_model/model.json
                    </code>{" "}
                    for browser-side inference using TensorFlow.js.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <h5 className="font-bold text-yellow-800 mb-2">
                  Why This Process Matters
                </h5>
                <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                  <li>
                    <strong>Keras 2 vs Keras 3:</strong> Keras 3 changed
                    internal JSON structure, breaking TensorFlow.js
                    compatibility
                  </li>
                  <li>
                    <strong>inbound_nodes:</strong> Layer connection metadata
                    required by TensorFlow.js to build computation graph
                  </li>
                  <li>
                    <strong>Weight Format:</strong> Binary shards optimize
                    loading and execution in browser environment
                  </li>
                  <li>
                    <strong>Browser Runtime:</strong> WebGL backend enables GPU
                    acceleration for real-time inference
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How the Application Works */}
          <div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-orange-600 rounded-xl">
                  <Cpu className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Application Architecture & Workflow
                  </h3>
                  <p className="text-slate-600">
                    End-to-end data flow from image upload to AI-powered
                    diagnosis
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
                  <h4 className="font-bold text-slate-900 mb-4">
                    🖼️ Frontend (Next.js + React + TypeScript)
                  </h4>
                  <div className="space-y-3 text-sm text-slate-700">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-blue-600 font-semibold min-w-[120px]">
                        page.tsx:
                      </span>
                      <span>
                        Main application component orchestrating Detection,
                        Diagnosis, and Chat cards
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-blue-600 font-semibold min-w-[120px]">
                        useModelLoader:
                      </span>
                      <span>
                        Custom hook to load TensorFlow.js model from{" "}
                        <code className="px-2 py-1 bg-slate-100 rounded">
                          /web_model/model.json
                        </code>
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-blue-600 font-semibold min-w-[120px]">
                        useDiseasePredictor:
                      </span>
                      <span>
                        Handles image preprocessing (resize 224×224, normalize
                        [0,1]) and CNN inference
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-blue-600 font-semibold min-w-[120px]">
                        useChat:
                      </span>
                      <span>
                        Manages chat state, context initialization with
                        diagnosis, and API communication
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
                  <h4 className="font-bold text-slate-900 mb-4">
                    ⚙️ Backend (Next.js API Routes)
                  </h4>
                  <div className="space-y-3 text-sm text-slate-700">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-purple-600 font-semibold min-w-[120px]">
                        /api/explain:
                      </span>
                      <span>
                        POST endpoint receiving disease name, calls OpenRouter
                        AI (GPT-4o-mini) to generate detailed diagnosis
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-purple-600 font-semibold min-w-[120px]">
                        /api/chat:
                      </span>
                      <span>
                        POST endpoint for conversational AI, maintains context
                        history for follow-up questions
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-purple-600 font-semibold min-w-[120px]">
                        OpenRouter:
                      </span>
                      <span>
                        AI orchestration platform routing requests to OpenAI
                        models with unified API
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
                  <h4 className="font-bold text-slate-900 mb-4">
                    🔄 Complete Data Flow
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <span className="font-bold text-blue-700 min-w-[30px]">
                        1.
                      </span>
                      <div>
                        <p className="font-semibold text-blue-900">
                          Image Upload & Preprocessing
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          User uploads image → Canvas API reads pixels →
                          tf.browser.fromPixels() → resize(224×224) →
                          normalize(÷255) → expandDims to batch
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <span className="font-bold text-green-700 min-w-[30px]">
                        2.
                      </span>
                      <div>
                        <p className="font-semibold text-green-900">
                          CNN Inference (Browser)
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          Tensor → model.predict() → WebGL backend accelerates
                          computation → Output: [batch, 3] probability
                          distribution
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <span className="font-bold text-purple-700 min-w-[30px]">
                        3.
                      </span>
                      <div>
                        <p className="font-semibold text-purple-900">
                          Disease Classification
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          argMax(probabilities) → Map index to class name →
                          Display confidence score (max probability)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                      <span className="font-bold text-orange-700 min-w-[30px]">
                        4.
                      </span>
                      <div>
                        <p className="font-semibold text-orange-900">
                          AI Diagnosis Generation
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          POST /api/explain → OpenRouter → GPT-4o-mini
                          generates: description, causes, symptoms, treatment
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg">
                      <span className="font-bold text-pink-700 min-w-[30px]">
                        5.
                      </span>
                      <div>
                        <p className="font-semibold text-pink-900">
                          Interactive Chat
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          User question → POST /api/chat with context → AI
                          responds with contextual advice → Chat history
                          maintained for follow-ups
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
                  <h4 className="font-bold text-slate-900 mb-4">
                    🚀 Performance Optimizations
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="font-semibold text-slate-900 mb-2">
                        🔥 WebGL Acceleration
                      </p>
                      <p className="text-sm text-slate-600">
                        TensorFlow.js uses GPU via WebGL for 10-100x faster
                        inference vs CPU
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="font-semibold text-slate-900 mb-2">
                        💾 Model Caching
                      </p>
                      <p className="text-sm text-slate-600">
                        Browser caches model.json and weights after first load
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="font-semibold text-slate-900 mb-2">
                        🧹 Memory Management
                      </p>
                      <p className="text-sm text-slate-600">
                        Explicit tensor.dispose() prevents memory leaks
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="font-semibold text-slate-900 mb-2">
                        ⚡ Serverless APIs
                      </p>
                      <p className="text-sm text-slate-600">
                        Next.js API routes auto-scale on Vercel edge network
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
                  href="https://github.com/kuraohikari/rice-leaf-disease-app"
                  target="_blank"
                  className="text-slate-400 hover:text-slate-800 transition-colors"
                  title="GitHub Repository"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://colab.research.google.com/github/kuraohikari/rice-leaf-disease-app/blob/main/ModelTrainCode/RiceLeafDiseases.ipynb"
                  target="_blank"
                  className="text-slate-400 hover:text-slate-800 transition-colors"
                  title="Google Colab Notebook"
                >
                  <BookOpen className="h-5 w-5" />
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
