import Link from "next/link";
import Img from "./Img";
import { fmtRange, initials, type Exhibition } from "@/lib/content";

const STAT: Record<string, string> = { current: "진행 중", upcoming: "예정", recent: "최근 종료" };

export function ExhibitionCards({ items }: { items: Exhibition[] }) {
  if (!items.length) return <p className="empty">해당하는 전시가 없습니다.</p>;
  return (
    <div className="exGrid">
      {items.map((e) => (
        <a key={e.id} className="exCard" href={e.url} target="_blank" rel="noopener noreferrer">
          <div className="img">
            <Img src={e.image} alt={e.title} ph={initials(e.institution)} />
            <span className={`imgTag ${e.status === "current" ? "now" : ""}`}>{STAT[e.status]}</span>
          </div>
          <div className="body">
            <div className="meta">
              {e.countryName} · {fmtRange(e.start, e.end)}
            </div>
            <h3>{e.title}</h3>
            <div className="inst">{e.institution}</div>
            {e.artists.length ? <div className="who">{e.artists.slice(0, 4).join(", ")}</div> : null}
          </div>
        </a>
      ))}
    </div>
  );
}

export default function ExhibitionList({ items }: { items: Exhibition[] }) {
  if (!items.length) return <p className="empty">해당하는 전시가 없습니다.</p>;
  return (
    <ul className="exList">
      {items.map((e) => (
        <li key={e.id}>
          <a href={e.url} target="_blank" rel="noopener noreferrer" aria-hidden tabIndex={-1}>
            <Img src={e.image} alt="" ph={initials(e.institution)} className="thumb" />
          </a>
          <div>
            <a className="exT" href={e.url} target="_blank" rel="noopener noreferrer">
              {e.title}
            </a>
            <span className={`stat ${e.status === "current" ? "now" : ""}`} style={e.status === "current" ? { background: "var(--accent)", color: "#fff" } : undefined}>
              {STAT[e.status]}
            </span>
            <div className="exM">
              {e.institution} · {e.countryName} · {fmtRange(e.start, e.end)}
            </div>
            {e.artists.length ? (
              <div className="exM">
                {e.artists.map((a, i) => (
                  <span key={a + i}>
                    {i ? ", " : ""}
                    {e.artistLinks[i] ? <Link href={`/artist/${e.artistLinks[i]}`}>{a}</Link> : a}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
