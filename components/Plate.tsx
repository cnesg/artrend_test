import Link from "next/link";
import Img from "./Img";
import { initials } from "@/lib/content";

/** 도록 도판 한 장: 정사각 이미지 + 번호 · 이름 · 설명 */
export default function Plate({
  href,
  external,
  image,
  name,
  no,
  sub,
  wide,
}: {
  href: string;
  external?: boolean;
  image?: string;
  name: string;
  no?: string;
  sub?: string;
  wide?: boolean;
}) {
  const inner = (
    <>
      <div className="img">
        <Img src={image} alt={name} ph={name.length <= 12 ? name : initials(name)} />
      </div>
      <div className="cap">
        {no ? <span className="no">{no}</span> : null}
        <span className="nm">{name}</span>
        {sub ? <span className="sub">{sub}</span> : null}
      </div>
    </>
  );
  const cls = `plate ${wide ? "wide" : ""}`;
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
