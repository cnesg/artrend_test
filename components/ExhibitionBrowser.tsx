"use client";

import { useMemo, useState } from "react";
import type { Exhibition, Region } from "@/lib/content";
import { useRegion } from "@/lib/RegionContext";
import ExhibitionList, { ExhibitionCards } from "./ExhibitionList";

const STATUS: { k: string; label: string }[] = [
  { k: "current", label: "진행 중" },
  { k: "upcoming", label: "예정" },
  { k: "recent", label: "최근 종료" },
  { k: "", label: "전체" },
];

export default function ExhibitionBrowser({ items }: { items: Exhibition[] }) {
  const { region } = useRegion();
  const [sub, setSub] = useState("");
  const [status, setStatus] = useState("current");
  const [q, setQ] = useState("");

  const byRegion = useMemo(() => {
    const m = {} as Record<Region, Exhibition[]>;
    items.forEach((e) => {
      (m[e.region] ??= []).push(e);
    });
    return m;
  }, [items]);
  const inRegion = byRegion[region] ?? [];
  const subs = useMemo(() => {
    const m = new Map<string, number>();
    inRegion.forEach((e) => {
      if (e.subregion) m.set(e.subregion, (m.get(e.subregion) ?? 0) + 1);
    });
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [inRegion]);

  const shown = useMemo(() => {
    const k = q.trim().toLowerCase();
    return inRegion
      .filter((e) => (!sub || e.subregion === sub) && (!status || e.status === status))
      .filter((e) => !k || (e.title + e.titleEn + e.institution + e.artists.join(" ")).toLowerCase().includes(k))
      .sort((a, b) => (status === "upcoming" ? a.start.localeCompare(b.start) : b.start.localeCompare(a.start)));
  }, [inRegion, sub, status, q]);

  const withImg = shown.filter((e) => e.image).slice(0, 9);
  const rest = shown.filter((e) => !withImg.includes(e));

  return (
    <>
      <div className="pageHead">
        <h1>전시 — {region}</h1>
        <p>
          한국 · 일본 · 유럽 · 미주 주요 미술관의 진행 · 예정 · 최근 종료 전시입니다. 기관 공식 사이트의 전시 목록을 매일 읽어 옵니다. 지역은 오른쪽 위
          토글로 바꿀 수 있습니다.
        </p>
      </div>

      {subs.length > 1 && (
        <div className="filters" role="group" aria-label="세부 지역">
          <button className="pill" aria-pressed={!sub} onClick={() => setSub("")}>
            {region} 전체
          </button>
          {subs.map(([s, n]) => (
            <button key={s} className="pill" aria-pressed={sub === s} onClick={() => setSub(s)}>
              {s} {n}
            </button>
          ))}
        </div>
      )}

      <div className="filters" role="group" aria-label="상태">
        {STATUS.map((s) => (
          <button key={s.k} className="pill" aria-pressed={status === s.k} onClick={() => setStatus(s.k)}>
            {s.label}
          </button>
        ))}
        <input className="search" type="search" placeholder="전시 · 기관 · 작가 검색" value={q} onChange={(e) => setQ(e.target.value)} aria-label="전시 검색" />
      </div>
      <p className="count">{shown.length}건</p>
      {withImg.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <ExhibitionCards items={withImg} />
        </div>
      )}
      <ExhibitionList items={rest.slice(0, 200)} />
    </>
  );
}
