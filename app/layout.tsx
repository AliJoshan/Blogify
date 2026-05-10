import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/web/theme-provider";
import Navbar from "@/components/web/navbar";

import { Toaster } from "sonner";
import { SearchProvider } from "./context/search-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Blogify",
  description: "Modern blogging platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <SearchProvider>
            <Navbar />

            <main>{children}</main>
          </SearchProvider>

          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
