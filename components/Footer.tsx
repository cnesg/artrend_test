import Link from "next/link";
import { meta } from "@/lib/content";

export default function Footer() {
  const t = meta.generatedAt.replace("T", " ").slice(0, 16);
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="logo">ARTREND</div>
        <p>
          국내외 미술관·비엔날레·미술상·갤러리의 공개 기록과 미술 매체 기사를 매일 아침 읽고 정리합니다. 작품 가격과 투자 정보는 다루지 않습니다. 이미지는 각 기관·매체의
          페이지가 제공하는 대표 이미지를 미리보기로 쓰며 원문으로 연결됩니다.
        </p>
        <p>
          마지막 갱신 {t} · <Link href="/about">이 매거진에 대해</Link>
        </p>
      </div>
    </footer>
  );
}
