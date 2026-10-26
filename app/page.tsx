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
  initials,
  meta,
  movers,
  news,
  plateNo,
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

  // 표지 이미지: 주목 작가 중 이미지가 있는 첫 사람, 없으면 진행 중 전시
  const coverMover = movers.find((m) => m.image);
  const coverEx = exhibitions.find((e) => e.status === "current" && e.image);
  const coverImg = coverMover ? { src: coverMover.image, cap: `${coverMover.name} — ${coverMover.reason}`, href: `/artist/${coverMover.slug}`, ext: false }
    : coverEx ? { src: coverEx.image!, cap: `${coverEx.institution} 《${coverEx.title}》`, href: coverEx.url, ext: true } : null;

  const focus = movers.slice(0, 6);
  const opening = exhibitions
    .filter((e) => (e.status === "upcoming" && e.start <= shiftDays(meta.today, 21)) || (e.status === "current" && e.start >= shiftDays(meta.today, -10)))
    .sort((a, b) => (a.image ? 0 : 1) - (b.image ? 0 : 1) || a.start.localeCompare(b.start))
    .slice(0, 6);
  const rookies = stories.slice(0, 12);

  return (
    <>
      {/* 표지 */}
      <section className="cover" aria-label="표지">
        <div className="coverText">
          {hasNote ? (
            <>
              <div className="kicker">편집자 노트 · {meta.today.replace(/-/g, ".")}</div>
              <h1>{editorial.headline}</h1>
              {editorial.standfirst ? <p className="stand">{editorial.standfirst}</p> : null}
              <div className="body">
                {editorial.paragraphs!.map((p, i) => (
                  <p key={i}>{p.text}</p>
                ))}
              </div>
              <div className="byline">ARTREND 편집부 · 수집된 공개 기록에서만 씁니다 · 근거는 각 작가·전시 페이지에서 확인</div>
            </>
          ) : (
            <>
              <div className="kicker">오늘의 브리핑 · {meta.today.replace(/-/g, ".")}</div>
              <h1>{lead?.title ?? "오늘의 미술 동향"}</h1>
              {lead ? <p className="stand">{lead.body}</p> : null}
              <div className="body">
                {digest.slice(1, 4).map((d) => (
                  <p key={d.title}>
                    <b>{d.kicker}</b> — {d.title}. {d.body}
                  </p>
                ))}
              </div>
              <div className="byline">수집된 공개 기록에서 자동으로 계산한 사실입니다</div>
            </>
          )}
        </div>
        {coverImg && (
          <figure className="coverArt">
            {coverImg.ext ? (
              <a href={coverImg.href} target="_blank" rel="noopener noreferrer">
                <Img src={coverImg.src} alt="" ph="" className="plate" />
              </a>
            ) : (
              <Link href={coverImg.href}>
                <Img src={coverImg.src} alt="" ph="" className="plate" />
              </Link>
            )}
            <figcaption>{coverImg.cap}</figcaption>
          </figure>
        )}
      </section>

      {/* 이번 주 주목 작가 */}
      <section className="sec" aria-label="이번 주 주목 작가">
        <div className="secHead">
          <h2>이번 주 주목</h2>
          <span className="more">최근 60일 안에 개막·수상·선정 기록이 새로 생긴 작가</span>
        </div>
        <div className="focus">
          {focus.map((m) => {
            const a = bySlug.get(m.slug);
            return (
              <Link key={m.slug} href={`/artist/${m.slug}`} className="focusCard">
                <div className="img">
                  <Img src={m.image} alt={m.name} ph={initials(m.name)} />
                </div>
                <div>
                  <h3>{m.name}</h3>
                  {a?.profile?.lede ? <p className="lede">{a.profile.lede}</p> : null}
                  <p className="why">{m.reason}</p>
                  <div className="kinds">
                    {m.rookie ? <span className="tag rookie">루키</span> : null}
                    {m.kinds.slice(0, 4).map((k) => (
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
        <p className="secNote" style={{ marginTop: 16 }}>
          <Link href="/artists">작가 전체 보기 →</Link>
        </p>
      </section>

      {/* 루키 도록 */}
      <section className="sec" aria-label="루키">
        <div className="secHead">
          <h2>루키 — 최근 선정</h2>
          <Link href="/awards" className="more">
            청년작가 프로그램 · 신진상 전체
          </Link>
        </div>
        <div className="plates">
          {rookies.map((s, i) => (
            <Plate
              key={s.name + s.program}
              href={s.slug ? `/artist/${s.slug}` : s.url}
              external={!s.slug}
              image={s.image}
              name={s.name}
              no={plateNo(i)}
              sub={`${shortProgram(s.program)} ${s.year}${s.role && !/선정|수상|winner/i.test(s.role) ? ` · ${s.role}` : ""}`}
            />
          ))}
        </div>
        <p className="secNote" style={{ marginTop: 14 }}>
          국공립·사립 미술관의 청년작가 프로그램과 신진 미술상에서 올해 또는 가장 최근 회차에 뽑힌 작가입니다. 프로그램별로 고르게 실었으며 순위가 아닙니다.
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

      {/* 키워드 */}
      <section className="sec" aria-label="이번 주 키워드">
        <div className="secHead">
          <h2>이번 주 키워드</h2>
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
                <div className="kw">
                  {(w?.terms ?? []).slice(0, 8).map((t) =>
                    t.example?.u ? (
                      <a key={t.term} href={t.example.u} target="_blank" rel="noopener noreferrer" title={t.example.t}>
                        {t.term}
                        <em>{t.count}</em>
                      </a>
                    ) : (
                      <span key={t.term} className="k">
                        {t.term}
                        <em>{t.count}</em>
                      </span>
                    )
                  )}
                  {!w?.terms?.length && <span className="empty">이번 주는 뚜렷한 키워드가 없습니다</span>}
                </div>
              </div>
            );
          })}
        </div>
        <p className="secNote" style={{ marginTop: 12 }}>최근 7일 기사 제목에서 평소(직전 8주)보다 눈에 띄게 늘어난 말입니다. 숫자는 기사 수.</p>
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
          {(["kr", "jp", "world"] as Scope[]).map((sc) => (
            <div key={sc}>
              <h3>{SCOPE_LABEL[sc]}</h3>
              <NewsList items={news[sc].slice(0, 6)} showSummary={false} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
