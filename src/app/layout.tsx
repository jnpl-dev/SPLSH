import type { Metadata, Viewport } from "next";
import { Bungee, Knewave, Luckiest_Guy, Poppins } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

const luckiest = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
  variable: "--luckiest",
  display: "swap",
});

const knewave = Knewave({
  subsets: ["latin"],
  weight: "400",
  variable: "--knewave",
  display: "swap",
});

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--bungee",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SPLSH — For those who like it wet | Boracay Water Adventures",
  description:
    "SPLSH is a Boracay water-adventure brand for every interest and skill level. Explore our brand story, logo, first post and WET & WILD campaign.",
};

export const viewport: Viewport = {
  themeColor: "#103098",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${luckiest.variable} ${knewave.variable} ${bungee.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
