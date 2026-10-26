import type { Metadata } from "next";
import ArtistBrowser from "@/components/ArtistBrowser";
import { artists } from "@/lib/content";

export const metadata: Metadata = { title: "작가" };

export default function ArtistsPage() {
  return (
    <>
      <div className="pageHead">
        <h1>작가</h1>
        <p>
          <b>지금 움직이는</b>은 최근 60일 안에 전시 개막·수상·비엔날레 참여 기록이 새로 생긴 작가, <b>루키</b>는 청년작가 프로그램·신진상에 선정된 작가,{" "}
          <b>제너럴</b>은 상·비엔날레·미술관·갤러리·명단 중 세 종류 이상에 이름이 오른 작가입니다. 순위나 점수는 매기지 않습니다.
        </p>
      </div>
      <ArtistBrowser items={artists} />
    </>
  );
}
