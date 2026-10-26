import type { Metadata } from "next";
import Link from "next/link";
import { biennales } from "@/lib/content";

export const metadata: Metadata = { title: "비엔날레" };

export default function BiennalesPage() {
  const years = [...new Set(biennales.map((b) => b.year ?? 0))].sort((a, b) => b - a);
  return (
    <>
      <div className="pageHead">
        <h1>비엔날레</h1>
        <p>주요 비엔날레·트리엔날레의 회차별 참여 작가입니다(2023년 이후). 이름을 누르면 작가 페이지로 이어집니다.</p>
      </div>
      {years.map((y) => (
        <section key={y} className="sec">
          <div className="secHead">
            <h2>{y || "연도 미상"}</h2>
          </div>
          {biennales
            .filter((b) => (b.year ?? 0) === y)
            .map((b) => (
              <details key={b.biennale + b.edition + y} style={{ borderBottom: "1px solid var(--line)", padding: "12px 0" }}>
                <summary style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 17 }}>
                  {b.biennale}{" "}
                  <span style={{ color: "var(--ink-3)", fontWeight: 400, fontSize: 13, fontFamily: "var(--sans)" }}>
                    {b.edition} · {b.countryName} · {b.count}명
                  </span>
                </summary>
                <div className="names" style={{ marginTop: 12 }}>
                  {b.artists.map((a, i) =>
                    a.slug ? (
                      <Link key={a.name + i} href={`/artist/${a.slug}`}>
                        {a.name}
                      </Link>
                    ) : (
                      <span key={a.name + i}>{a.name}</span>
                    )
                  )}
                </div>
                <p className="srcLine">
                  출처{" "}
                  <a href={b.source} target="_blank" rel="noopener noreferrer">
                    {b.source.replace(/^https?:\/\//, "").split("/")[0]}
                  </a>
                </p>
              </details>
            ))}
        </section>
      ))}
    </>
  );
}
