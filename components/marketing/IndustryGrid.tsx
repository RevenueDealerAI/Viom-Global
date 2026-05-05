import {
  Activity,
  Banknote,
  Cloud,
  Truck,
  ShoppingBag,
  Building2,
  Shield,
  Scale,
  Antenna,
  GraduationCap,
  Factory,
  HeartHandshake,
} from "lucide-react";
import { Container } from "../primitives/Container";
import { Chip } from "../primitives/Chip";
import { Button } from "../primitives/Button";
import { Reveal } from "../motion/Reveal";

const ROW_1 = [
  { label: "Healthcare", Icon: Activity },
  { label: "Finance", Icon: Banknote },
  { label: "SaaS", Icon: Cloud },
  { label: "Logistics", Icon: Truck },
  { label: "Retail", Icon: ShoppingBag },
  { label: "Government", Icon: Building2 },
];

const ROW_2 = [
  { label: "Insurance", Icon: Shield },
  { label: "Legal", Icon: Scale },
  { label: "Telecom", Icon: Antenna },
  { label: "Education", Icon: GraduationCap },
  { label: "Manufacturing", Icon: Factory },
  { label: "Nonprofit", Icon: HeartHandshake },
];

export function IndustryGrid() {
  return (
    <Container>
      <Reveal>
        <h2 className="h2 max-w-[820px]">
          <span style={{ color: "var(--color-brand)" }} className="block">
            One platform,
          </span>
          <span className="ink">every industry.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-12 flex flex-col gap-3">
          <div className="flex flex-wrap gap-3">
            {ROW_1.map(({ label, Icon }) => (
              <Chip key={label} variant="industry" icon={<Icon size={15} strokeWidth={1.5} />}>
                {label}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {ROW_2.map(({ label, Icon }) => (
              <Chip key={label} variant="industry" icon={<Icon size={15} strokeWidth={1.5} />}>
                {label}
              </Chip>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-20 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <h3 className="h3 max-w-[560px] text-fg-on-light">
            When our customers work, the world works.
          </h3>
        </Reveal>
        <Reveal delay={0.05}>
          <Button
            href="/#customers"
            variant="primary"
            className="!bg-fg-on-light !text-cream shadow-none hover:!bg-fg-on-light/90"
          >
            See all customer stories
          </Button>
        </Reveal>
      </div>
    </Container>
  );
}
