import { Fraunces, Inter_Tight } from "next/font/google";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.juliocabos.es";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const rootClassName = `${fraunces.variable} ${inter.variable} antialiased`;
