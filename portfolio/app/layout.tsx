import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navigation/Navbar";
import { ProjectsModalProvider } from "@/components/modal/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio - Bruno Alexandre Da Cruz Costa",
  description: "Bruno Alexandre Da Cruz Costa's Portfolio",
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
            <ProjectsModalProvider />
            <Navbar />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
