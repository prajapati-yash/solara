import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ContextProvider from "../components/context";
export const metadata: Metadata = {
  title: "Solara",
  description: "Empower Your Crypto Borrowing with Solara",
};
import { headers } from "next/headers"; // added


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get('cookie')

  return (
    <html lang="en">
      <body
        className={"antialiased"}
      >
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
        </body>
    </html>
  );
}