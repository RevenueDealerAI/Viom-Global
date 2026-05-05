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
        {/* Mobile + tablet: single grid of all 12 chips. md: switches to two flex-wrap rows. */}
        <div className="mt-10 lg:mt-12">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:hidden">
            {[...ROW_1, ...ROW_2].map(({ label, Icon }) => (
              <Chip key={label} variant="industry" icon={<Icon size={15} strokeWidth={1.5} />}>
                {label}
              </Chip>
            ))}
          </div>
          <div className="hidden flex-col gap-3 md:flex">
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
        </div>
      </Reveal>

      <div className="mt-14 flex flex-col items-start gap-6 sm:mt-20 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <h3 className="h3 max-w-[560px] text-fg-on-light">
            When our customers work, the world works.
          </h3>
        </Reveal>
        <Reveal delay={0.05} className="w-full sm:w-auto">
          <Button
            href="/#customers"
            variant="primary"
            className="!bg-fg-on-light !text-cream shadow-none hover:!bg-fg-on-light/90 w-full justify-center sm:w-auto"
          >
            See all customer stories
          </Button>
        </Reveal>
      </div>
    </Container>
  );
}
