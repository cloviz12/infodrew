import type { Metadata } from "next";
import SectionListing from "@/components/SectionListing";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Colombia — InfoDrew",
  description: "Los temas y acontecimientos más relevantes de Colombia.",
};

export default function ColombiaPage() {
  return <SectionListing section="COLOMBIA" />;
}
