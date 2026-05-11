import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/web/theme-provider";
import Navbar from "@/components/web/navbar";

import { Toaster } from "sonner";
import { SearchProvider } from "./context/search-context";
import Footer from "@/components/web/footer";

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
        <div className="flex min-h-screen flex-col">
          <ThemeProvider>
            <SearchProvider>
              <Navbar />

              <main className="flex-1">{children}</main>
              <Footer />
            </SearchProvider>

            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
