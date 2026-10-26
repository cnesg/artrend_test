import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Img from "@/components/Img";
import { ExhibitionCards } from "@/components/ExhibitionList";
import { artistBySlug, artists, exhibitions, initials, TYPE_LABEL } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = artistBySlug(slug);
  return { title: a ? a.name : "작가", description: a?.profile?.lede || a?.reason };
}

const TYPE_ORDER = ["award", "biennale", "museum_solo", "gallery", "ranking"];

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = artistBySlug(slug);
  if (!a) notFound();

  const exs = exhibitions.filter((e) => e.artistLinks.includes(a.slug));
  const live = exs.filter((e) => e.status !== "recent");
  const sub = [a.nameEn, a.nameLocal, a.nationality, a.birthYear ? `${a.birthYear}년생` : ""].filter(Boolean).join(" · ");
  const profile = a.profile;
  const facts = profile?.facts ?? {};
  const factIds = Object.keys(facts);
  const timeline = [...a.signals]
    .filter((s) => !s.baseline)
    .sort((x, y) => (y.year ?? 0) - (x.year ?? 0) || TYPE_ORDER.indexOf(x.type) - TYPE_ORDER.indexOf(y.type));
  const baseline = a.signals.filter((s) => s.baseline);

  return (
    <>
      <section className="aHero">
        <figure>
          <div className="plateBox">
            {a.image ? (
              a.imageLink ? (
                <a href={a.imageLink} target="_blank" rel="noopener noreferrer">
                  <Img src={a.image} alt={a.name} ph={initials(a.name)} />
                </a>
              ) : (
                <Img src={a.image} alt={a.name} ph={initials(a.name)} />
              )
            ) : (
              <div className="ph">{initials(a.name)}</div>
            )}
          </div>
          <figcaption>{a.image ? `이미지: ${a.imageSource} 페이지의 대표 이미지 (원문으로 연결)` : "대표 이미지를 가져올 수 있는 공개 페이지가 아직 없습니다"}</figcaption>
        </figure>
        <div>
          <div className="kicker">{a.rookie ? "루키 · 청년작가 프로그램 선정" : a.types.length >= 3 ? `제너럴 · 기록 ${a.types.length}종류` : "작가"}</div>
          <h1 style={{ marginTop: 8 }}>{a.name}</h1>
          {sub && <div className="aSub">{sub}</div>}
          {profile?.lede ? <p className="aLede">{profile.lede}</p> : null}
          {a.reason ? (
            <div className="aWhy">
              <span className="kicker">왜 지금</span>
              {a.recentEvents?.length ? (
                <ul>
                  {a.recentEvents.map((ev, i) => (
                    <li key={i}>
                      · {ev.url ? <a href={ev.url} target="_blank" rel="noopener noreferrer">{ev.text}</a> : ev.text}
                    </li>
                  ))}
                </ul>
              ) : (
                a.reason
              )}
            </div>
          ) : null}
          {profile?.paragraphs?.length ? (
            <div className="aBody">
              {profile.paragraphs.map((p, i) => (
                <p key={i}>
                  {p.text}
                  {p.evidence.map((e) =>
                    factIds.includes(e) ? (
                      <sup key={e}>
                        <a href={`#fact-${e}`}>{factIds.indexOf(e) + 1}</a>
                      </sup>
                    ) : null
                  )}
                </p>
              ))}
            </div>
          ) : null}
          <div className="aTags">
            {a.types.map((t) => (
              <span key={t} className="tag">
                {TYPE_LABEL[t] ?? t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {live.length > 0 && (
        <section className="evGroup">
          <h2>지금 볼 수 있는 곳</h2>
          <ExhibitionCards items={live} />
        </section>
      )}

      <section className="evGroup">
        <h2>기록</h2>
        <ul className="timeline">
          {timeline.map((s, i) => (
            <li key={i}>
              <span className="y">{s.year ?? ""}</span>
              <span className={`t ${s.type}`}>{TYPE_LABEL[s.type] ?? s.type}</span>
              <span>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ) : (
                  s.label
                )}
                {s.role ? <span style={{ color: "var(--ink-3)" }}> · {s.role}</span> : null}
              </span>
            </li>
          ))}
          {baseline.map((s, i) => (
            <li key={"b" + i}>
              <span className="y">{s.year}</span>
              <span className="t">기준선</span>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {exs.length > live.length && (
        <section className="evGroup">
          <h2>최근 끝난 전시</h2>
          <ExhibitionCards items={exs.filter((e) => e.status === "recent")} />
        </section>
      )}

      {a.related?.length ? (
        <section className="evGroup">
          <h2>같이 볼 작가</h2>
          <div className="related">
            {a.related.map((r) => (
              <Link key={r.slug} href={`/artist/${r.slug}`}>
                {r.name}
                <span>{r.via}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div className="foot">
        {factIds.length > 0 && (
          <>
            글의 근거
            <ol>
              {factIds.map((id) => (
                <li key={id} id={`fact-${id}`}>
                  {facts[id]}
                </li>
              ))}
            </ol>
          </>
        )}
        <p style={{ marginTop: 10 }}>
          이 페이지는 공개된 명단·전시 목록·갤러리 작가 페이지에서 확인된 기록만 모은 것입니다. 기록의 많고 적음으로 작가를 평가하지 않으며, 작품 가격은 다루지 않습니다. 이름 표기가 달라
          같은 작가의 다른 기록이 빠져 있을 수 있습니다. <Link href="/artists">← 작가 목록</Link>
        </p>
      </div>
    </>
  );
}
