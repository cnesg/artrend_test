"use client";

import { useMemo, useState } from "react";
import type { NewsItem, Region } from "@/lib/content";
import { displayTitle, presentRegions } from "@/lib/content";
import NewsList from "./NewsList";

export default function NewsBrowser({ data }: { data: Partial<Record<Region, NewsItem[]>> }) {
  const regions = useMemo(() => presentRegions(data), [data]);
  const [region, setRegion] = useState<Region>(regions[0]);
  const [source, setSource] = useState("");
  const [q, setQ] = useState("");
  const items = data[region] ?? [];
  const sources = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((n) => m.set(n.source, (m.get(n.source) ?? 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 14);
  }, [items]);
  const shown = useMemo(() => {
    const k = q.trim().toLowerCase();
    return items.filter((n) => (!source || n.source === source) && (!k || (displayTitle(n) + n.title + n.summary).toLowerCase().includes(k)));
  }, [items, source, q]);

  return (
    <>
      <div className="pageHeadRow">
        <div className="pageHeadText">
          <h1>뉴스</h1>
          <p>국내 · 아시아 · 유럽 · 미주의 미술 매체와 검색 결과에서 모은 최근 기사입니다. 한국어가 아닌 기사는 한국어로 옮겨 싣고, 원문 링크를 함께 답니다.</p>
        </div>
        <div className="regionTabs" role="group" aria-label="지역">
          {regions.map((r) => (
            <button
              key={r}
              className="pill"
              aria-pressed={region === r}
              onClick={() => {
                setRegion(r);
                setSource("");
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="filters">
        <input className="search" type="search" placeholder="제목 · 요약 검색" value={q} onChange={(e) => setQ(e.target.value)} aria-label="뉴스 검색" />
      </div>
      <div className="filters" role="group" aria-label="매체">
        <button className="pill" aria-pressed={!source} onClick={() => setSource("")}>
          전체 매체
        </button>
        {sources.map(([s, c]) => (
          <button key={s} className="pill" aria-pressed={source === s} onClick={() => setSource(s)}>
            {s} {c}
          </button>
        ))}
      </div>
      <p className="count">{shown.length}건</p>
      <NewsList items={shown.slice(0, 150)} />
      {shown.length > 150 && <p className="count">최근 150건까지 표시합니다. 검색 · 매체 필터로 좁혀 보세요.</p>}
    </>
  );
}
