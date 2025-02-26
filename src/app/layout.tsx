import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duc Thien's blog",
  description: "Personal blogs about software development, SRE and fun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script defer src="/umami.js" data-website-id="833cb692-88c7-467a-8cf7-ffec21b39bd4" />
    </html>
  );
}
