import { Montserrat_Alternates } from "next/font/google";

export const fontMontserrat = Montserrat_Alternates({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["cyrillic", "latin"],
  variable: "--font-montserrat",
});
