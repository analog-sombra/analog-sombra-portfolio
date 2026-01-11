import type { Metadata } from "next";
import "./globals.css";
import Cursor from "./components/cursor";
import FallingPaddles from "./components/FallingPaddles";
import CustomCursor from "./components/CustomCursor";
import FluteSount from "./components/flutesound";

export const metadata: Metadata = {
  title: "Analog Sombra",
  description: "Always a learner, forever a coder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Cursor />
        {/* <FallingPaddles /> */}
        <CustomCursor />
        <FluteSount />
        {children}
      </body>
    </html>
  );
}
