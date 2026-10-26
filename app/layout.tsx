import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-display", display: "swap" });
const serif = Noto_Serif_KR({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-serif", display: "swap" });
const sans = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: { default: "ARTREND — 미술 동향 매거진", template: "%s · ARTREND" },
  description: "국내외 미술관·비엔날레·미술상·갤러리·뉴스를 매일 읽고, 지금 봐야 할 작가와 전시를 짚는 미술 동향 매거진.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f5f0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-theme="light" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body>
        <Masthead />
        <main>
          <div className="wrap">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
