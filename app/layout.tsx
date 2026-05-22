import type { Metadata } from "next";
import { Zalando_Sans_Expanded } from "next/font/google";
import "./globals.css";

const zalandoSans = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zalando",
});

export const metadata: Metadata = {
  title: "Team Sangre — ¿Puedes donar?",
  description:
    "Descubre si tú también puedes ser Team Sangre respondiendo este cuestionario.",
  openGraph: {
    title: "Team Sangre",
    description: "Descubre si puedes donar sangre y ser parte del Team Sangre.",
    images: ["/images/og.png"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={zalandoSans.variable}>
      <body>{children}</body>
    </html>
  );
}
