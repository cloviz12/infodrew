import type { Metadata } from "next";
import SectionListing from "@/components/SectionListing";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cauca — InfoDrew",
  description:
    "Organizaciones sociales, comunidades campesinas, mujeres y comunidades afro del territorio caucano.",
};

export default function CaucaPage() {
  return <SectionListing section="CAUCA" />;
}
