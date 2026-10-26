"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Artist } from "@/lib/content";
import { initials, TYPE_LABEL } from "@/lib/content";
import Img from "./Img";

const TYPES = Object.keys(TYPE_LABEL);
type Part = "" | "rookie" | "general" | "moving";
const PARTS: [Part, string][] = [
  ["moving", "지금 움직이는"],
  ["rookie", "루키"],
  ["general", "제너럴"],
  ["", "전체"],
];

export default function ArtistBrowser({ items }: { items: Artist[] }) {
  const [part, setPart] = useState<Part>("moving");
  const [type, setType] = useState("");
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const k = q.trim().toLowerCase();
    const base = items.filter((a) =>
      part === "rookie" ? a.rookie : part === "general" ? a.types.length >= 3 : part === "moving" ? (a.recentEvents?.length ?? 0) > 0 : true
    );
    const f = base.filter((a) => !type || a.types.includes(type)).filter((a) => !k || (a.name + a.nameEn + a.nameLocal).toLowerCase().includes(k));
    if (part === "moving") f.sort((x, y) => (y.recentEvents?.[0]?.date ?? "").localeCompare(x.recentEvents?.[0]?.date ?? ""));
    return f;
  }, [items, part, type, q]);
  return (
    <>
      <div className="filters" role="group" aria-label="파트">
        {PARTS.map(([k, l]) => (
          <button key={k} className="pill" aria-pressed={part === k} onClick={() => setPart(k)}>
            {l}
          </button>
        ))}
        <input className="search" type="search" placeholder="작가 이름 검색 (한글 · 영문 · 일본어)" value={q} onChange={(e) => setQ(e.target.value)} aria-label="작가 검색" />
      </div>
      <div className="filters" role="group" aria-label="기록 종류">
        <button className="pill" aria-pressed={!type} onClick={() => setType("")}>
          모든 기록
        </button>
        {TYPES.map((t) => (
          <button key={t} className="pill" aria-pressed={type === t} onClick={() => setType(t)}>
            {TYPE_LABEL[t]}
          </button>
        ))}
      </div>
      <p className="count">{shown.length}명</p>
      <div className="focus">
        {shown.slice(0, 120).map((a) => (
          <Link key={a.slug} href={`/artist/${a.slug}`} className="focusCard">
            <div className="img">
              <Img src={a.image} alt={a.name} ph={initials(a.name)} />
            </div>
            <div>
              <h3>{a.name}</h3>
              {a.profile?.lede ? <p className="lede">{a.profile.lede}</p> : null}
              <p className="why">{a.reason}</p>
              <div className="kinds">
                {a.rookie ? <span className="tag rookie">루키</span> : null}
                {a.types.map((t) => (
                  <span key={t} className="tag">
                    {TYPE_LABEL[t] ?? t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {shown.length > 120 && <p className="count">120명까지 표시합니다. 검색으로 좁혀 보세요.</p>}
    </>
  );
}
