import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import RegionModal from "@/components/RegionModal";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "We Smoke Fish | Premium Artisanal Seafood",
  description: "Authentic smoked fish, signature seafood rolls, and handmade delicacies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} antialiased selection:bg-accent selection:text-white`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen relative">
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
          </div>
          <RegionModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
