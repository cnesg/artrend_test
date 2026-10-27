import Link from "next/link";
import Img from "./Img";
import { initials } from "@/lib/content";

/** 도록 타일: 정사각 이미지(위에 알약 태그 가능) + 이름 · 설명 */
export default function Plate({
  href,
  external,
  image,
  name,
  tag,
  sub,
}: {
  href: string;
  external?: boolean;
  image?: string;
  name: string;
  tag?: string;
  sub?: string;
}) {
  const inner = (
    <>
      <div className="img">
        <Img src={image} alt={name} ph={name.length <= 12 ? name : initials(name)} />
        {tag ? <span className="imgTag">{tag}</span> : null}
      </div>
      <div className="cap">
        <span className="nm">{name}</span>
        {sub ? <span className="sub">{sub}</span> : null}
      </div>
    </>
  );
  return external ? (
    <a href={href} className="plate" target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className="plate">
      {inner}
    </Link>
  );
}
