import type { Metadata } from "next";
import { Bangers, Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-title",
});

export const metadata: Metadata = {
  title: "RIFT: Ecos de la Vida",
  description:
    "Una aventura interactiva sobre adaptación, supervivencia y evolución.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geist.variable} ${bangers.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}