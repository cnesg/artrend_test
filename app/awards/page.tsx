import type { Metadata } from "next";
import Link from "next/link";
import { awards } from "@/lib/content";

export const metadata: Metadata = { title: "상 · 선정" };

export default function AwardsPage() {
  const groups = [
    { title: "청년작가 프로그램 · 신진상", items: awards.filter((a) => a.rookieProgram) },
    { title: "그 밖의 상", items: awards.filter((a) => !a.rookieProgram) },
  ];
  return (
    <>
      <div className="pageHead">
        <h1>상 · 선정</h1>
        <p>2023년 이후 발표된 미술상과 청년작가 선정 명단입니다. 미술관과 재단이 심사를 거쳐 고른 이름이라, 작가가 제도권에서 처음 확인되는 자리이기도 합니다.</p>
      </div>
      {groups.map((g) => (
        <section key={g.title} className="sec">
          <div className="secHead">
            <h2>{g.title}</h2>
          </div>
          {g.items.map((a) => {
            const years = [...new Set(a.items.map((i) => i.year))].sort((x, y) => y - x);
            return (
              <article key={a.award} className="awardBlock">
                <h3>
                  {a.award} <span className="tag">{a.countryName}</span>
                </h3>
                {years.map((y) => (
                  <div key={y} className="yr">
                    <span className="y">{y}</span>
                    <span className="names">
                      {a.items
                        .filter((i) => i.year === y)
                        .map((i) => (
                          <span key={i.name + i.role}>
                            {i.slug ? (
                              <Link href={`/artist/${i.slug}`}>{i.name}</Link>
                            ) : (
                              <a href={i.url} target="_blank" rel="noopener noreferrer">
                                {i.name}
                              </a>
                            )}
                            {i.role ? <small>{i.role}</small> : null}
                          </span>
                        ))}
                    </span>
                  </div>
                ))}
                {a.source ? (
                  <p className="srcLine">
                    출처{" "}
                    <a href={a.source} target="_blank" rel="noopener noreferrer">
                      {a.source.replace(/^https?:\/\//, "").split("/")[0]}
                    </a>
                  </p>
                ) : null}
              </article>
            );
          })}
        </section>
      ))}
    </>
  );
}
