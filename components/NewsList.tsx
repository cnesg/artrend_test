import Img from "./Img";
import { displayTitle, fmtDate, type NewsItem } from "@/lib/content";

export default function NewsList({ items, showSummary = true, thumbs = true }: { items: NewsItem[]; showSummary?: boolean; thumbs?: boolean }) {
  if (!items.length) return <p className="empty">표시할 기사가 없습니다.</p>;
  return (
    <ul className="newsList">
      {items.map((n) => (
        <li key={n.url} className={thumbs && n.image ? "hasImg" : ""}>
          <div>
            <a className="nt" href={n.url} target="_blank" rel="noopener noreferrer">
              {displayTitle(n)}
            </a>
            <div className="nm">
              {n.source} · {n.date.slice(0, 4)}.{fmtDate(n.date)}
            </div>
            {showSummary && n.summary ? <p className="ns">{n.summary}</p> : null}
          </div>
          {thumbs && n.image ? (
            <a href={n.url} target="_blank" rel="noopener noreferrer" aria-hidden tabIndex={-1}>
              <Img src={n.image} alt="" ph="" className="thumb" />
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
