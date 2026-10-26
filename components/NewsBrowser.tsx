"use client";

import { useMemo, useState } from "react";
import type { NewsItem, Scope } from "@/lib/content";
import { displayTitle, SCOPE_LABEL } from "@/lib/content";
import NewsList from "./NewsList";

export default function NewsBrowser({ data }: { data: Record<Scope, NewsItem[]> }) {
  const [scope, setScope] = useState<Scope>("kr");
  const [source, setSource] = useState("");
  const [q, setQ] = useState("");
  const items = data[scope];
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
      <div className="filters" role="group" aria-label="지역">
        {(["kr", "jp", "world"] as Scope[]).map((s) => (
          <button
            key={s}
            className="pill"
            aria-pressed={scope === s}
            onClick={() => {
              setScope(s);
              setSource("");
            }}
          >
            {SCOPE_LABEL[s]} {data[s].length}
          </button>
        ))}
        <input className="search" type="search" placeholder="제목·요약 검색" value={q} onChange={(e) => setQ(e.target.value)} aria-label="뉴스 검색" />
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
      <p className="count">{shown.length}건 · 제목·요약·링크만 싣고 본문은 원문 사이트에서 읽습니다</p>
      <NewsList items={shown.slice(0, 150)} />
      {shown.length > 150 && <p className="count">최근 150건까지 표시합니다. 검색·매체 필터로 좁혀 보세요.</p>}
    </>
  );
}
