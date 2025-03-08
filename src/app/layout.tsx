import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import SideTab from "@/components/SideTab";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "StudyVerse",
  description: "StudyVerse is an AI-powered smart learning platform that helps students stay focused, manage their study time effectively, and develop critical thinking skills. With intelligent scheduling, step-by-step guidance, and balanced workload management, it transforms learning into a productive and engaging experience. Additionally, StudyVerse detects students' emotions and stress levels, providing personalized break recommendations and wellness tips to ensure a healthy study-life balance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-sky-100 text-sky-950`}>
        <Header/>
        <div
          style={{ height: `calc(100vh - 96px)` }}
          className="flex w-screen space-x-4 p-4"
        >
        <SideTab/>
        <main 
            className="p-4 bg-white w-full h-full rounded overflow-y-auto"
            style={{ flexBasis: 'calc(100vw - 14rem)' }}>
          {children}
        </main>

        </div>
      </body>
    </html>
  );
}
