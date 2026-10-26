"use client";

import { useMemo, useState } from "react";
import type { Exhibition } from "@/lib/content";
import ExhibitionList, { ExhibitionCards } from "./ExhibitionList";

const STATUS: { k: string; label: string }[] = [
  { k: "current", label: "진행 중" },
  { k: "upcoming", label: "예정" },
  { k: "recent", label: "최근 종료" },
  { k: "", label: "전체" },
];

export default function ExhibitionBrowser({ items }: { items: Exhibition[] }) {
  const [status, setStatus] = useState("current");
  const [country, setCountry] = useState("");
  const [q, setQ] = useState("");
  const countries = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((e) => m.set(e.countryName, (m.get(e.countryName) ?? 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [items]);
  const shown = useMemo(() => {
    const k = q.trim().toLowerCase();
    return items
      .filter((e) => (!status || e.status === status) && (!country || e.countryName === country))
      .filter((e) => !k || (e.title + e.titleEn + e.institution + e.artists.join(" ")).toLowerCase().includes(k))
      .sort((a, b) => (status === "upcoming" ? a.start.localeCompare(b.start) : b.start.localeCompare(a.start)));
  }, [items, status, country, q]);
  const withImg = shown.filter((e) => e.image).slice(0, 9);
  const rest = shown.filter((e) => !withImg.includes(e));
  return (
    <>
      <div className="filters" role="group" aria-label="상태">
        {STATUS.map((s) => (
          <button key={s.k} className="pill" aria-pressed={status === s.k} onClick={() => setStatus(s.k)}>
            {s.label}
          </button>
        ))}
        <input className="search" type="search" placeholder="전시 · 기관 · 작가 검색" value={q} onChange={(e) => setQ(e.target.value)} aria-label="전시 검색" />
      </div>
      <div className="filters" role="group" aria-label="나라">
        <button className="pill" aria-pressed={!country} onClick={() => setCountry("")}>
          전체
        </button>
        {countries.map(([c, n]) => (
          <button key={c} className="pill" aria-pressed={country === c} onClick={() => setCountry(c)}>
            {c} {n}
          </button>
        ))}
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
