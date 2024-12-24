import localFont from "next/font/local";
import { Inter_Tight } from "next/font/google";

export const fontBebas = localFont({
  src: [
    {
      path: "./bebas/BebasNeue-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./bebas/BebasNeue-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./bebas/BebasNeue-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./bebas/BebasNeue-Book.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./bebas/BebasNeue-Thin.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-bebas",
  display: "swap",
});

export const fontInter = Inter_Tight({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  variable: "--font-inter",
});
