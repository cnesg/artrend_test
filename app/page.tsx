import Link from "next/link";
import Plate from "@/components/Plate";
import Img from "@/components/Img";
import NewsList from "@/components/NewsList";
import { ExhibitionCards } from "@/components/ExhibitionList";
import {
  artists,
  digest,
  editorial,
  exhibitions,
  meta,
  movers,
  news,
  presentRegions,
  shortProgram,
  stories,
  trends,
  SCOPE_LABEL,
  type Scope,
} from "@/lib/content";

function shiftDays(iso: string, days: number): string {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export default function Home() {
  const bySlug = new Map(artists.map((a) => [a.slug, a]));
  const hasNote = Boolean(editorial.headline && editorial.paragraphs?.length);
  const lead = digest[0];
  const leadExcerpt = hasNote
    ? editorial.standfirst || editorial.paragraphs?.[0]?.text || ""
    : lead?.body || "";
  const leadTitle = hasNote ? editorial.headline! : lead?.title ?? "오늘의 미술 동향";
  const leadKicker = hasNote ? "편집자 노트" : "오늘의 브리핑";

  const withImg = movers.filter((m) => m.image);
  const coverMover = withImg[0];
  const coverEx = exhibitions.find((e) => e.status === "current" && e.image);
  const mainImg = coverMover?.image || coverEx?.image;

  // 히어로 보조 카드 2개: 주목 작가(이미지 있는 것 우선) 중 메인과 겹치지 않는 것
  const sideMovers = withImg.filter((m) => m.slug !== coverMover?.slug).slice(0, 2);

  const focus = movers.slice(0, 6);
  const opening = exhibitions
    .filter((e) => (e.status === "upcoming" && e.start <= shiftDays(meta.today, 21)) || (e.status === "current" && e.start >= shiftDays(meta.today, -10)))
    .sort((a, b) => (a.image ? 0 : 1) - (b.image ? 0 : 1) || a.start.localeCompare(b.start))
    .slice(0, 6);
  const rookies = stories.slice(0, 12);

  return (
    <>
      {/* 히어로 */}
      <section className="hero" aria-label="표지">
        <article className="heroCard heroMain">
          <div className="imgBox">
            <Img src={mainImg} alt="" ph={leadTitle} />
            <span className="imgTag solid">{leadKicker}</span>
          </div>
          <div className="body">
            <h2>{leadTitle}</h2>
            {leadExcerpt ? <p className="excerpt">{leadExcerpt}</p> : null}
            <div className="byline">{meta.today.replace(/-/g, ".")} · ARTREND 편집부 · 수집된 공개 기록에서만 씁니다</div>
          </div>
        </article>
        {sideMovers.map((m) => (
          <Link key={m.slug} href={`/artist/${m.slug}`} className="heroCard">
            <div className="imgBox">
              <Img src={m.image} alt={m.name} ph={m.name} />
              {m.rookie ? <span className="imgTag solid">루키</span> : <span className="imgTag">{m.kinds[0] ?? "주목"}</span>}
            </div>
            <div className="body">
              <h2>{m.name}</h2>
              <p className="excerpt">{m.reason}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* 이번 주 주목 작가 */}
      <section className="sec" aria-label="이번 주 주목 작가">
        <div className="secHead">
          <h2>이번 주 주목</h2>
          <Link href="/artists" className="more">
            작가 전체 →
          </Link>
        </div>
        <p className="secNote" style={{ marginBottom: 18, marginTop: -8 }}>
          최근 60일 안에 개막 · 수상 · 선정 기록이 새로 생긴 작가입니다.
        </p>
        <div className="focus">
          {focus.map((m) => {
            const a = bySlug.get(m.slug);
            return (
              <Link key={m.slug} href={`/artist/${m.slug}`} className="focusCard">
                <div className="img">
                  <Img src={m.image} alt={m.name} ph={m.name} />
                  {m.rookie ? <span className="imgTag solid">루키</span> : null}
                </div>
                <div className="body">
                  <h3>{m.name}</h3>
                  {a?.profile?.lede ? <p className="lede">{a.profile.lede}</p> : null}
                  <p className="why">{m.reason}</p>
                  <div className="kinds">
                    {m.kinds.slice(0, 3).map((k) => (
                      <span key={k} className="tag">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 루키 도록 */}
      <section className="sec" aria-label="루키">
        <div className="secHead">
          <h2>루키 — 최근 선정</h2>
          <Link href="/awards" className="more">
            청년작가 프로그램 전체
          </Link>
        </div>
        <div className="plates">
          {rookies.map((s) => (
            <Plate
              key={s.name + s.program}
              href={s.slug ? `/artist/${s.slug}` : s.url}
              external={!s.slug}
              image={s.image}
              name={s.name}
              tag={String(s.year)}
              sub={`${shortProgram(s.program)}${s.role && !/선정|수상|winner/i.test(s.role) ? ` · ${s.role}` : ""}`}
            />
          ))}
        </div>
        <p className="secNote" style={{ marginTop: 14 }}>
          국공립 · 사립 미술관의 청년작가 프로그램과 신진 미술상에서 올해 또는 가장 최근 회차에 뽑힌 작가입니다. 프로그램별로 고르게 실었으며 순위가 아닙니다.
        </p>
      </section>

      {/* 지금 볼 전시 */}
      <section className="sec" aria-label="지금 볼 전시">
        <div className="secHead">
          <h2>지금 볼 전시</h2>
          <Link href="/exhibitions" className="more">
            전시 전체 ({meta.exhibitions})
          </Link>
        </div>
        <ExhibitionCards items={opening} />
      </section>

      {/* 트렌딩 토픽 */}
      <section className="sec" aria-label="이번 주 키워드">
        <div className="secHead">
          <h2>트렌딩 토픽</h2>
          <Link href="/trends" className="more">
            월별 추이
          </Link>
        </div>
        <div className="kwGrid">
          {(["kr", "jp", "world"] as Scope[]).map((sc) => {
            const w = trends.weekly[sc];
            return (
              <div key={sc} className="kwCol">
                <h3>{SCOPE_LABEL[sc]}</h3>
                <span className="sub">최근 7일 기사 {w?.articles ?? 0}건</span>
                {(w?.terms ?? []).slice(0, 7).map((t) => {
                  const row = (
                    <>
                      <span className="term">{t.term}</span>
                      <span className="cnt">{t.count}건</span>
                    </>
                  );
                  return t.example?.u ? (
                    <a key={t.term} className="kwRow" href={t.example.u} target="_blank" rel="noopener noreferrer" title={t.example.t}>
                      {row}
                    </a>
                  ) : (
                    <div key={t.term} className="kwRow">
                      {row}
                    </div>
                  );
                })}
                {!w?.terms?.length && (
                  <p className="empty" style={{ padding: "6px 0" }}>
                    이번 주는 뚜렷한 키워드가 없습니다
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 뉴스 */}
      <section className="sec" aria-label="뉴스">
        <div className="secHead">
          <h2>뉴스</h2>
          <Link href="/news" className="more">
            뉴스 전체
          </Link>
        </div>
        <div className="newsCols">
          {presentRegions(news).map((r) => (
            <div key={r}>
              <h3>{r}</h3>
              <NewsList items={news[r]!.slice(0, 6)} showSummary={false} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
