import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MedOps Intelligence | Medical Operations Dashboard",
    template: "%s | MedOps Intelligence",
  },
  description:
    "Enterprise AI-powered medical operations intelligence and automation platform for hospitals, clinics, and multi-branch healthcare organizations. Smarter Data | Healthier Operations | Better Patient Outcomes.",
  keywords: [
    "hospital management",
    "healthcare dashboard",
    "medical operations",
    "AI healthcare",
    "hospital analytics",
    "EMR",
    "revenue cycle",
  ],
  authors: [{ name: "MedGroup India Pvt. Ltd." }],
  robots: "noindex, nofollow", // Demo mode
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-50 text-slate-900`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
