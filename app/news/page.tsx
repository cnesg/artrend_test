import type { Metadata } from "next";
import NewsBrowser from "@/components/NewsBrowser";
import { news } from "@/lib/content";

export const metadata: Metadata = { title: "뉴스" };

export default function NewsPage() {
  return <NewsBrowser data={news} />;
}
