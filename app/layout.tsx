import type { Metadata, Viewport } from "next";
import { Archivo_Black, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import { RegionProvider } from "@/lib/RegionContext";

const display = Archivo_Black({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const sans = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: { default: "ARTREND — 미술 동향 매거진", template: "%s · ARTREND" },
  description: "국내외 미술관·비엔날레·미술상·갤러리·뉴스를 매일 읽고, 지금 봐야 할 작가와 전시를 짚는 미술 동향 매거진.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f5f0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-theme="light" className={`${display.variable} ${sans.variable}`}>
      <body>
        <RegionProvider>
          <Masthead />
          <main>
            <div className="wrap">{children}</div>
          </main>
          <Footer />
        </RegionProvider>
      </body>
    </html>
  );
}
