import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./Components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ChatTrix - a new World!",
  description: "ChatTrix is a chatting app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>



        {children}



        </SessionWrapper>
      </body>
    </html>
  );
}
