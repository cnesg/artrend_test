import type { Metadata } from "next";
import ExhibitionBrowser from "@/components/ExhibitionBrowser";
import { exhibitions } from "@/lib/content";

export const metadata: Metadata = { title: "전시" };

export default function ExhibitionsPage() {
  return <ExhibitionBrowser items={exhibitions} />;
}
