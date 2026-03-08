import type { Metadata, Viewport } from "next";
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

// Advanced SEO & Metadata Configuration
export const metadata: Metadata = {
  title: {
    default: "Chronos | Secure Event Countdown Tracker",
    template: "%s | Chronos"
  },
  description: "A sleek, secure, and minimalist event countdown tracker to manage your important milestones, deadlines, and launches with a calming interface.",
  keywords: ["countdown", "event tracker", "milestone manager", "deadline tracker", "productivity", "time management", "secure tracker"],
  authors: [{ name: "Chronos Team" }],
  creator: "Chronos",
  publisher: "Chronos",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Chronos | Secure Event Countdown Tracker",
    description: "Manage your important milestones and deadlines with our sleek, high-tech countdown collection.",
    url: "https://your-deployed-url.vercel.app", // Update this with your actual URL later
    siteName: "Chronos Tracker",
    images: [
      {
        url: "/og-image.png", // Add a sleek 1200x630 image to your public folder later
        width: 1200,
        height: 630,
        alt: "Chronos Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chronos | Secure Event Countdown Tracker",
    description: "Manage your important milestones and deadlines with our sleek, high-tech countdown collection.",
    images: ["/og-image.png"], // Same as OG image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest", // Optional: If you want to make it a PWA later
};

// Viewport configuration for responsive design and theme color
export const viewport: Viewport = {
  themeColor: "#f8fafc", // Tailwind slate-50 to match your app background
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents input zoom on mobile for a native app feel
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}