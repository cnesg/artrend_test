import type { Metadata } from "next";
import { rankings } from "@/lib/content";

export const metadata: Metadata = { title: "명단" };

export default function RankingsPage() {
  const cmp = rankings.power100Compare;
  const entered = cmp.filter((r) => r.rank_2025 && !r.rank_2024);
  const left = cmp.filter((r) => r.rank_2024 && !r.rank_2025);
  const artists25 = (rankings.power100["2025"] ?? []).filter((r) => /artist/i.test(r.category));
  return (
    <>
      <div className="pageHead">
        <h1>명단</h1>
        <p>외부 기관이 발표한 명단을 그대로 정리했습니다. 이 사이트가 매긴 순위가 아니며, 작가끼리 비교하는 용도로 쓰지 않습니다.</p>
      </div>

      <section className="sec">
        <div className="secHead">
          <h2>ArtReview Power 100</h2>
          <span className="more">2023–2025 · ArtReview 발표</span>
        </div>
        <p className="secNote">2024→2025 사이 새로 이름이 오른 {entered.length}명, 빠진 {left.length}명. 선정 이유 전문은 ArtReview 원문에서 읽을 수 있습니다.</p>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>이름</th>
                <th>구분</th>
                <th>국적</th>
                <th>2023</th>
                <th>2024</th>
                <th>2025</th>
              </tr>
            </thead>
            <tbody>
              {cmp
                .filter((r) => r.rank_2025)
                .sort((a, b) => Number(a.rank_2025) - Number(b.rank_2025))
                .map((r) => (
                  <tr key={r.name}>
                    <td>{r.name}</td>
                    <td>{r.category}</td>
                    <td>{r.nationality}</td>
                    <td>{r.rank_2023 || "–"}</td>
                    <td>{r.rank_2024 || "–"}</td>
                    <td>{r.rank_2025}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <p className="secNote" style={{ marginTop: 8 }}>
          2025년 명단의 작가 {artists25.length}명 · 출처 <a href="https://artreview.com/power-100/" target="_blank" rel="noopener noreferrer">artreview.com/power-100</a>
        </p>
      </section>

      <section className="sec">
        <div className="secHead">
          <h2>쿤스트 콤파스 2022 Top 100</h2>
          <span className="more">기준선 · Capital지</span>
        </div>
        <p className="secNote">생존 작가의 미술관 개인전·대형 그룹전·전문지 리뷰·미술관 소장을 점수로 합산한 독일 Capital지의 명단입니다(가격·판매 제외). 4년 전 판이라 기준선으로만 보여 줍니다.</p>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>순위</th>
                <th>작가</th>
                <th>한글</th>
                <th>출생</th>
                <th>국가</th>
              </tr>
            </thead>
            <tbody>
              {rankings.kunstkompass2022.map((r) => (
                <tr key={r.rank + r.name}>
                  <td>{r.rank}</td>
                  <td>{r.name}</td>
                  <td>{r.nameKo}</td>
                  <td>{r.birthYear}</td>
                  <td>{r.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="sec">
        <div className="secHead">
          <h2>미술관 관람객 (2025)</h2>
          <span className="more">The Art Newspaper 기준 · 위키백과 표 인용</span>
        </div>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>순위</th>
                <th>미술관</th>
                <th>도시</th>
                <th>관람객</th>
              </tr>
            </thead>
            <tbody>
              {rankings.visitors.slice(0, 30).map((r) => (
                <tr key={r.rank + r.museum}>
                  <td>{r.rank}</td>
                  <td>{r.museum}</td>
                  <td>{r.city}</td>
                  <td>{Number(r.visitors) ? Number(r.visitors).toLocaleString("ko-KR") : r.visitors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
