"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { REGION_ORDER } from "@/lib/content";
import { useRegion } from "@/lib/RegionContext";

const NAV = [
  { href: "/", label: "오늘" },
  { href: "/artists", label: "작가" },
  { href: "/exhibitions", label: "전시" },
  { href: "/news", label: "뉴스" },
  { href: "/awards", label: "상 · 선정" },
  { href: "/biennales", label: "비엔날레" },
  { href: "/rankings", label: "명단" },
  { href: "/trends", label: "키워드" },
  { href: "/about", label: "소개" },
];

export default function Masthead() {
  const path = usePathname() || "/";
  const { region, setRegion } = useRegion();

  return (
    <header className="mast">
      <div className="wrap">
        <div className="mastTop">
          <Link href="/" className="logoWrap" aria-label="ARTREND 홈">
            <span className="echo e2" aria-hidden="true">ARTREND</span>
            <span className="echo" aria-hidden="true">ARTREND</span>
            <span className="logo">
              ARTREND
              <span className="logoSub">미술 동향 매거진</span>
            </span>
          </Link>
          <div className="regionSwitch" role="radiogroup" aria-label="지역 선택 (전시 · 뉴스에 적용)">
            {REGION_ORDER.map((r) => (
              <button key={r} role="radio" aria-checked={region === r} className={region === r ? "on" : ""} onClick={() => setRegion(r)}>
                {r}
              </button>
            ))}
          </div>
        </div>
        <nav className="nav" aria-label="주 메뉴">
          {NAV.map((n) => {
            const on = n.href === "/" ? path === "/" : path === n.href || path.startsWith(n.href + "/") || (n.href === "/artists" && path.startsWith("/artist/"));
            return (
              <Link key={n.href} href={n.href} aria-current={on ? "page" : undefined}>
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
