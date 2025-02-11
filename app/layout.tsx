import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import NavMenu from "@/components/navMenu";

const geist = Geist({
  subsets: ["latin"],
  display: 'swap',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Training Score",
  description: "Track and manage training scores effectively",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen antialiased">
        <NavMenu />
        {children}
      </body>
    </html>
  );
}
