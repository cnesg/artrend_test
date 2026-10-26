import type { Metadata } from "next";
import NewsBrowser from "@/components/NewsBrowser";
import { news } from "@/lib/content";

export const metadata: Metadata = { title: "뉴스" };

export default function NewsPage() {
  return (
    <>
      <div className="pageHead">
        <h1>뉴스</h1>
        <p>국내·일본·해외 미술 매체와 검색 결과에서 모은 최근 기사입니다. 미술과 무관한 기사는 걸러냅니다.</p>
      </div>
      <NewsBrowser data={news} />
    </>
  );
}
