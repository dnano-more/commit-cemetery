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
  title: "Commit Cemetery 🪦 Forensic AI for Forgotten Codebases",
  description: "Exhume the ghosts, suspicious commits, abandoned features, and murdered code in your Git repository.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-purple-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
