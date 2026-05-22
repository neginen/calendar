import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ساعت و تقویم ایران",
  description: "Iran calendar built with Next.js, TypeScript and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}