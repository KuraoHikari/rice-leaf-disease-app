import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RiceGuard AI - Rice Leaf Disease Detection",
    short_name: "RiceGuard AI",
    description:
      "AI-powered rice leaf disease detection system using CNN and TensorFlow.js",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#16a34a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["agriculture", "productivity", "utilities"],
  };
}
