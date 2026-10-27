import metaFile from "@/content/meta.json";
import digestFile from "@/content/digest.json";
import storiesFile from "@/content/stories.json";
import moversFile from "@/content/movers.json";
import editorialFile from "@/content/editorial.json";
import newsFile from "@/content/news.json";
import trendsFile from "@/content/trends.json";
import exhibitionsFile from "@/content/exhibitions.json";
import awardsFile from "@/content/awards.json";
import biennalesFile from "@/content/biennales.json";
import artistsFile from "@/content/artists.json";
import rankingsFile from "@/content/rankings.json";
import sourcesFile from "@/content/sources.json";

/**
 * 모든 콘텐츠는 ARTREND-DATA 가 매일 아침 만들어 content/*.json 으로 내보낸다
 * (ARTREND-DATA/scripts/export_magazine.py). 이 사이트는 DB 도 외부 API 도 부르지 않는다.
 */

export type Meta = {
  generatedAt: string;
  today: string;
  datasets: number;
  rows: number;
  artists: number;
  rookies: number;
  exhibitions: number;
  news: Record<string, number>;
  countries: number;
};
export type Digest = { kicker: string; title: string; body: string; href: string; external?: boolean; scope?: string };
export type Story = {
  name: string;
  slug: string;
  program: string;
  year: number;
  role: string;
  country: string;
  url: string;
  birthYear: number | null;
  image?: string;
};
export type Mover = { slug: string; name: string; reason: string; image: string; date: string; kinds: string[]; rookie: boolean; n: number };
export type Para = { text: string; evidence: string[] };
export type Editorial = {
  headline?: string;
  standfirst?: string;
  paragraphs?: Para[];
  model?: string;
  at?: string;
  facts?: Record<string, string>;
};
export type NewsItem = {
  date: string;
  source: string;
  title: string;
  titleKo: string;
  summary: string;
  url: string;
  country: string;
  countryName: string;
  image?: string;
};
/** 뉴스 · 전시 지역 탭. 홈의 트렌딩 키워드 패널만 예전처럼 kr/jp/world(언어 기준) 3분류를 그대로 쓴다. */
export type Region = "국내" | "일본" | "유럽" | "미주" | "기타";
export const REGION_ORDER: Region[] = ["국내", "일본", "유럽", "미주", "기타"];
export type Scope = "kr" | "jp" | "world";
export type TrendTerm = { term: string; count: number; base: number; ratio: number; example: { t?: string; u?: string; m?: string } };
export type Trends = {
  weekly: Partial<Record<Scope, { end: string; articles: number; baseWeekly: number; terms: TrendTerm[] }>>;
  monthly: Partial<Record<Scope, { month: string; articles: number; terms: string[] }[]>>;
};
export type Exhibition = {
  id: string;
  country: string;
  countryName: string;
  region: Region;
  subregion: string;
  institution: string;
  title: string;
  titleEn: string;
  start: string;
  end: string;
  status: "current" | "upcoming" | "recent";
  type: string;
  artists: string[];
  artistLinks: string[];
  url: string;
  longRunning: boolean;
  image?: string;
  imageSource?: string;
};
export type AwardItem = { year: number; name: string; nameEn: string; role: string; birthYear: number | null; slug: string; url: string };
export type Award = { award: string; country: string; countryName: string; rookieProgram: boolean; items: AwardItem[]; source: string; limits: string };
export type BiennaleArtist = { name: string; local: string; nationality: string; slug: string };
export type Biennale = {
  biennale: string;
  edition: string;
  year: number | null;
  country: string;
  countryName: string;
  count: number;
  artists: BiennaleArtist[];
  source: string;
  limits: string;
};
export type Signal = { type: string; label: string; year: number | null; role?: string; url?: string; baseline?: boolean };
export type Profile = { lede: string; paragraphs: Para[]; model: string; at: string; facts?: Record<string, string> };
export type Artist = {
  slug: string;
  name: string;
  nameEn: string;
  nameLocal: string;
  birthYear: number | null;
  nationality: string;
  types: string[];
  rookie: boolean;
  latestYear: number;
  signals: Signal[];
  image?: string;
  imageSource?: string;
  imageLink?: string;
  reason?: string;
  recentEvents?: { kind: string; text: string; url: string; date: string }[];
  related?: { slug: string; name: string; via: string }[];
  profile?: Profile;
};
export type Rankings = {
  power100: Record<string, { rank: number; name: string; role: string; nationality: string; category: string; url: string }[]>;
  power100Compare: Record<string, string>[];
  kunstkompass2022: { rank: string; name: string; nameKo: string; birthYear: string; country: string }[];
  visitors: { rank: string; museum: string; country: string; city: string; visitors: string; year: string }[];
};
export type Source = {
  title: string;
  country: string;
  countryName: string;
  category: string;
  rows: number;
  period: string;
  collectedAt: string;
  method: string;
  cycle: string;
  limits: string;
  sourceIds: string[];
  urls: string[];
};

export const meta = metaFile as unknown as Meta;
export const digest = digestFile as unknown as Digest[];
export const stories = storiesFile as unknown as Story[];
export const movers = moversFile as unknown as Mover[];
export const editorial = editorialFile as unknown as Editorial;
export const news = newsFile as unknown as Partial<Record<Region, NewsItem[]>>;
export const trends = trendsFile as unknown as Trends;
export const exhibitions = exhibitionsFile as unknown as Exhibition[];
export const awards = awardsFile as unknown as Award[];
export const biennales = biennalesFile as unknown as Biennale[];
export const artists = artistsFile as unknown as Artist[];
export const rankings = rankingsFile as unknown as Rankings;
export const sources = sourcesFile as unknown as Source[];

export const TYPE_LABEL: Record<string, string> = {
  award: "상 · 선정",
  biennale: "비엔날레",
  gallery: "갤러리",
  museum_solo: "미술관 개인전",
  ranking: "명단",
};
export const SCOPE_LABEL: Record<Scope, string> = { kr: "국내", jp: "일본", world: "해외" };

/** 신호 종류별 알약 태그 색상 클래스 (globals.css 의 .pill-{type}) */
export function pillClass(type: string): string {
  return `imgTag pill-${type}`;
}

export function artistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}
export function fmtDate(d: string): string {
  const m = d.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${Number(m[2])}.${Number(m[3])}` : d;
}
export function fmtRange(s: string, e: string): string {
  if (!s) return "";
  const sy = s.slice(0, 4);
  const ey = e.slice(0, 4);
  return `${sy}.${fmtDate(s)} – ${e ? (ey !== sy ? `${ey}.` : "") + fmtDate(e) : "기한 미정"}`;
}
export function initials(name: string): string {
  const t = name.trim();
  if (/[가-힣ぁ-んァ-ヴ一-龥]/.test(t)) return t.replace(/\s/g, "").slice(0, 2);
  const parts = t.split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}
export function displayTitle(n: NewsItem): string {
  return n.titleKo || n.title;
}
export function shortProgram(p: string): string {
  return p.replace(/^(국립현대미술관|부산시립미술관|대전시립미술관|금호미술관|종근당\(고촌\)|서울시립미술관)\s*/, "").replace(/\s*\(.*?\)\s*$/, "").slice(0, 24);
}
export function plateNo(i: number): string {
  return `pl. ${String(i + 1).padStart(2, "0")}`;
}

/** 데이터에 실제로 있는 지역만, 정해진 순서(국내·아시아·유럽·미주·국제)로 */
export function presentRegions(bucket: Partial<Record<Region, unknown[]>>): Region[] {
  return REGION_ORDER.filter((r) => (bucket[r]?.length ?? 0) > 0);
}
