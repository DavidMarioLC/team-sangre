import type { Metadata } from "next";
import { Zalando_Sans_Expanded } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";

const zalandoSans = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zalando",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://team-sangre.vercel.app/"),
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
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
