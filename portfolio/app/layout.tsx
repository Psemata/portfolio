import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navigation/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio - Bruno Alexandre Da Cruz Costa",
  description: "Le portfolio de Bruno Alexandre Da Cruz Costa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={cn(
          "relative h-full font-portfolio antialiased",
          inter.className
        )}
      >
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">
            <Navbar />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
