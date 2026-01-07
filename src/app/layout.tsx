import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duc Thien",
  description: "Personal blogs about software development, SRE and fun.",
  authors: [{ name: "iuuukhueeee", url: "https://iuuukhueeee.github.io" }],
  creator: "iuuukhueeee",
  publisher: "iuuukhueeee",
  keywords: [
    "AWS",
    "Amazon Web Services",
    "VPC",
    "Networking",
    "React Native",
    "Expo",
    "Xcode",
    "Typescript",
    "React",
    "JavaScript",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="robots" content="index, follow" />
      <meta name="google-site-verification" content="p3HZuHH7HXMmZUk-zlxY_wj0F-Wy5HvVklw-SDH5IqQ" />
      <meta name="google-site-verification" content="0uNjj0CwYIhC8zkYgVT4PUV2pwMF06nNTRuPZ4kYbs0" />
      <body className={inter.className}>
        <header>
          <nav className="px-4 lg:px-6 py-2.5">
            <div className="md:flex md:flex-wrap md:justify-between items-center mx-auto max-w-screen-xl mt-5 text-gray-300">
              <Link href="/">Development, SRE and fun.</Link>
              <div className="gap-7 flex mt-8 sm:mt-0">
                <Link href="https://yusou.dev" prefetch>
                  Yusou 🚚
                </Link>
                <Link href="/about" prefetch>
                  About
                </Link>
              </div>
            </div>
          </nav>
        </header>
        {children}
      </body>
      {/* <Script
        defer
        src="/stats/script.js"
        data-website-id="833cb692-88c7-467a-8cf7-ffec21b39bd4"
      /> */}
    </html>
  );
}
