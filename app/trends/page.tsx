import type { Metadata } from "next";
import { SCOPE_LABEL, trends, type Scope } from "@/lib/content";

export const metadata: Metadata = { title: "키워드" };

export default function TrendsPage() {
  return (
    <>
      <div className="pageHead">
        <h1>키워드</h1>
        <p>기사 제목에서 많이 나온 단어를 지역별로 모았습니다. 기사 양이 많은 달에 흔한 단어가 늘어나 보이지 않도록 그 달의 평소 대비 늘어난 단어만 골랐습니다.</p>
      </div>
      {(["kr", "jp", "world"] as Scope[]).map((sc) => {
        const w = trends.weekly[sc];
        const m = trends.monthly[sc] ?? [];
        return (
          <section key={sc} className="sec">
            <div className="secHead">
              <h2>{SCOPE_LABEL[sc]}</h2>
              <span className="more">최근 7일 기사 {w?.articles ?? 0}건 · 평소 주 {w?.baseWeekly ?? 0}건</span>
            </div>
            <div className="kw" style={{ marginBottom: 18 }}>
              {(w?.terms ?? []).map((t) => (
                <a key={t.term} href={t.example?.u || "#"} target="_blank" rel="noopener noreferrer" title={t.example?.t}>
                  {t.term}
                  <em>
                    {t.count}건 · ×{t.ratio}
                  </em>
                </a>
              ))}
            </div>
            <div className="tableWrap">
              <table>
                <thead>
                  <tr>
                    <th>월</th>
                    <th>기사</th>
                    <th>그 달에 유독 많이 나온 단어</th>
                  </tr>
                </thead>
                <tbody>
                  {[...m].reverse().map((r) => (
                    <tr key={r.month}>
                      <td>{r.month}</td>
                      <td>{r.articles.toLocaleString("ko-KR")}</td>
                      <td>{r.terms.join(" · ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
      <p className="note">2024-10 ~ 2025-09 기간은 수집 범위가 좁아 기사 수가 적습니다. 최근 1년과 직접 비교해 증감을 읽지 마세요.</p>
    </>
  );
}
