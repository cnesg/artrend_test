"use client";

import { useState } from "react";

/**
 * 원문 페이지의 대표 이미지를 '링크 미리보기'로 보여 준다. 파일을 복사해 두지 않고 원문 주소를 그대로 쓴다.
 * 불러오지 못하면 글자 없이 빈 회색 박스만 남긴다(깨진 글자가 뜨지 않도록).
 */
export default function Img({ src, alt, className }: { src?: string; alt: string; ph?: string; className?: string }) {
  const [broken, setBroken] = useState(false);
  if (!src || broken) return <div className={`ph ${className ?? ""}`} aria-hidden="true" />;
  return <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" onError={() => setBroken(true)} className={className} />;
}
