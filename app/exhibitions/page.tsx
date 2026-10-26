import type { Metadata } from "next";
import ExhibitionBrowser from "@/components/ExhibitionBrowser";
import { exhibitions } from "@/lib/content";

export const metadata: Metadata = { title: "전시" };

export default function ExhibitionsPage() {
  return (
    <>
      <div className="pageHead">
        <h1>전시</h1>
        <p>한국·일본·미국·유럽·아시아 미술관의 진행·예정·최근 종료 전시입니다. 기관 공식 사이트의 전시 목록을 매일 읽어 옵니다.</p>
      </div>
      <ExhibitionBrowser items={exhibitions} />
    </>
  );
}
