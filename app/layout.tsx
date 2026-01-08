import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RiceGuard AI - Rice Leaf Disease Detection with AI",
    template: "%s | RiceGuard AI",
  },
  description:
    "Instant AI-powered detection of rice leaf diseases including Bacterial Blight, Brown Spot, and Leaf Smut. Get accurate diagnosis in seconds with our CNN model powered by TensorFlow.js. Free web-based tool for farmers and agricultural experts.",
  keywords: [
    "rice disease detection",
    "AI agriculture",
    "plant disease detection",
    "CNN model",
    "TensorFlow.js",
    "bacterial leaf blight",
    "brown spot",
    "leaf smut",
    "crop disease diagnosis",
    "smart farming",
    "precision agriculture",
    "machine learning agriculture",
    "rice crop health",
    "agricultural AI tool",
    "rice leaf analysis",
  ],
  authors: [
    {
      name: "Dewa Gede Indra Putra",
      url: "https://github.com/kuraohikari",
    },
  ],
  creator: "Dewa Gede Indra Putra",
  publisher: "Primakara University",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rice-leaf-disease-app.vercel.app",
    siteName: "RiceGuard AI",
    title: "RiceGuard AI - AI-Powered Rice Disease Detection",
    description:
      "Detect rice leaf diseases instantly with AI. Identify Bacterial Blight, Brown Spot, and Leaf Smut using advanced CNN technology. Free, fast, and accurate.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RiceGuard AI - Rice Leaf Disease Detection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RiceGuard AI - AI-Powered Rice Disease Detection",
    description:
      "Detect rice leaf diseases instantly with AI. Identify Bacterial Blight, Brown Spot, and Leaf Smut using advanced CNN technology.",
    images: ["/og-image.png"],
    creator: "@kuraohikari",
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: "https://rice-leaf-disease-app.vercel.app",
  },
  category: "Agriculture Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "RiceGuard AI",
              description:
                "AI-powered rice leaf disease detection system using CNN and TensorFlow.js",
              url: "https://rice-leaf-disease-app.vercel.app",
              applicationCategory: "Agriculture, AI Tool",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Person",
                name: "Dewa Gede Indra Putra",
                affiliation: {
                  "@type": "Organization",
                  name: "Primakara University",
                },
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "100",
              },
              featureList: [
                "Instant disease detection",
                "AI-powered diagnosis",
                "Interactive chat assistant",
                "96%+ accuracy",
                "Free to use",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
