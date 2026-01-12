import type { Metadata } from "next";
import "./globals.css";

import { SettingsProvider } from "../context/SettingsContext";
import FallingPaddles from "@/components/FallingPaddles";
import CustomCursor from "@/components/CustomCursor";
import FluteSound from "@/components/flutesound";
import PaintEffect from "@/components/paineffect";

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
        <SettingsProvider>
          <PaintEffect />
          <FallingPaddles />
          <CustomCursor />
          <FluteSound />
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
