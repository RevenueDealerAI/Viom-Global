import { Section } from "@/components/primitives/Section";
import { HeroCarousel } from "@/components/marketing/HeroCarousel";
import { TrustBand } from "@/components/marketing/TrustBand";
import { LogoStrip } from "@/components/marketing/LogoStrip";
import { Centerpiece } from "@/components/marketing/Centerpiece";
import { FourPillars } from "@/components/marketing/FourPillars";
import { TabMatrix } from "@/components/marketing/TabMatrix";
import { AIChatDemo } from "@/components/marketing/AIChatDemo";
import { IndustryGrid } from "@/components/marketing/IndustryGrid";
import { CustomerCarousel } from "@/components/marketing/CustomerCarousel";
import { RecognitionStrip } from "@/components/marketing/RecognitionStrip";
import { CTABand } from "@/components/marketing/CTABand";

export default function HomePage() {
  return (
    <>
      <Section tone="dark" noPad>
        <HeroCarousel />
      </Section>

      <Section tone="dark" className="pt-0">
        <TrustBand />
      </Section>

      <Section tone="dark" className="!py-24">
        <LogoStrip />
      </Section>

      <Section tone="dark" id="products">
        <Centerpiece />
      </Section>

      <Section tone="dark">
        <FourPillars />
      </Section>

      <Section tone="dark">
        <TabMatrix />
      </Section>

      <Section tone="dark">
        <AIChatDemo />
      </Section>

      <Section tone="light" id="industries">
        <IndustryGrid />
      </Section>

      <Section tone="light" className="!pt-0">
        <CustomerCarousel />
      </Section>

      <Section tone="dark">
        <RecognitionStrip />
      </Section>

      <Section tone="dark">
        <CTABand />
      </Section>
    </>
  );
}
