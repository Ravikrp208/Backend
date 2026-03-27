import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "The Hidden Hand | Elite Negotiation Game",
  description: "Negotiate the impossible. Low prices, high stakes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSerif.variable} ${manrope.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
