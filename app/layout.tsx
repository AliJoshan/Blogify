import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/web/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blogify",
  description: "Modern blog platform built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <div className="flex min-h-screen flex-col">
          {/* NAVBAR */}
          <Navbar />

          {/* MAIN CONTENT */}
          <main className="flex-1">{children}</main>

          {/* FOOTER */}
          <footer className="border-t py-6">
            <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground md:px-6">
              © 2026 Blogify. All rights reserved.
            </div>
          </footer>
        </div>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
