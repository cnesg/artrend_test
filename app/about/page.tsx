import type { Metadata } from "next";
import { meta, sources } from "@/lib/content";

export const metadata: Metadata = { title: "이 매거진에 대해" };

export default function AboutPage() {
  const inst = new Set(sources.filter((s) => s.category === "museum").map((s) => s.title.replace(/\s*(전시.*|\(.*)$/, "")));
  const programs = sources.filter((s) => s.category === "award").length;
  const biennales = sources.filter((s) => s.category === "biennale").length;
  const galleries = sources.filter((s) => s.category === "gallery").length;
  return (
    <>
      <div className="pageHead">
        <h1>이 매거진에 대해</h1>
        <p>ARTREND는 국내외 미술계의 공개 기록을 매일 아침 읽고, 지금 봐야 할 작가와 전시를 짚는 미술 동향 매거진입니다.</p>
      </div>

      <section className="sec">
        <div className="secHead">
          <h2>무엇을 읽나</h2>
        </div>
        <div className="aBody" style={{ marginTop: 0 }}>
          <p>
            한국·일본·미국·유럽·아시아의 미술관 {inst.size}곳의 전시 목록, 미술상과 청년작가 프로그램 {programs}종, 비엔날레 {biennales}회차의 참여 작가, 갤러리 {galleries}곳의 소속 작가 목록, 그리고
            세 언어권의 미술 매체 기사입니다. {meta.countries}개 나라의 기록이 들어옵니다.
          </p>
          <p>
            작가 페이지의 글은 이 기록들만으로 씁니다. 문장마다 근거 번호를 달고, 근거에 없는 내용은 싣지 않습니다. 이미지는 각 기관과 매체가 자기 페이지에 내건 대표 이미지를 미리보기로 쓰고
            원문으로 연결합니다.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="secHead">
          <h2>어떻게 고르나</h2>
        </div>
        <div className="aBody" style={{ marginTop: 0 }}>
          <p>
            <b>이번 주 주목</b>은 최근 60일 안에 전시 개막, 수상, 비엔날레 참여 같은 새 기록이 생긴 작가입니다. <b>루키</b>는 국공립·사립 미술관의 청년작가 프로그램과 신진상에 뽑힌 작가,{" "}
            <b>제너럴</b>은 상·비엔날레·미술관 개인전·갤러리·명단 가운데 세 종류 이상에 이름이 오른 작가입니다.
          </p>
          <p>점수를 합산해 순위를 매기지 않습니다. 가장 먼저 보는 것은 어디서 전시했는가이며, 작품 가격·낙찰가·투자 정보는 다루지 않습니다.</p>
        </div>
      </section>

      <section className="sec">
        <div className="secHead">
          <h2>한계</h2>
        </div>
        <div className="aBody" style={{ marginTop: 0 }}>
          <p>
            작가 이름의 표기(한글·영문·일본어)가 다르면 같은 작가가 나뉘어 보이거나, 같은 이름의 다른 작가가 합쳐질 수 있습니다. 사이트가 접근을 막은 기관의 기록은 비어 있습니다. 못 모은
            자료는 비워 두고 지어내지 않습니다.
          </p>
        </div>
      </section>
    </>
  );
}
