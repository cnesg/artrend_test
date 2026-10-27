"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { REGION_ORDER, type Region } from "./content";

const KEY = "artrend-region";
const RegionCtx = createContext<{ region: Region; setRegion: (r: Region) => void }>({
  region: REGION_ORDER[0],
  setRegion: () => {},
});

/**
 * 사이트 전체에서 공유하는 지역 선택(국내 · 일본 · 유럽 · 미주 · 기타).
 * 마스트헤드의 캡슐 토글이 이 값을 바꾸고, 전시 · 뉴스 페이지가 이 값을 읽어 내용을 거른다.
 * 브라우저에 저장해 페이지를 옮겨도 선택이 유지된다(사람마다 다를 수 있어 서버에는 저장하지 않음).
 */
export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegionState] = useState<Region>(REGION_ORDER[0]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Region | null;
      if (saved && REGION_ORDER.includes(saved)) setRegionState(saved);
    } catch {}
  }, []);

  const setRegion = (r: Region) => {
    setRegionState(r);
    try {
      localStorage.setItem(KEY, r);
    } catch {}
  };

  return <RegionCtx.Provider value={{ region, setRegion }}>{children}</RegionCtx.Provider>;
}

export function useRegion() {
  return useContext(RegionCtx);
}
