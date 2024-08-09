import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Checkout",
  description: "Powered by Das Payments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="ftd"
          src="https://payment.ipospays.com/ftd/v1/freedomtodesign.js"
          // @ts-ignore
          security_key={process.env.DEJAVOO_KEY}
        ></Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
