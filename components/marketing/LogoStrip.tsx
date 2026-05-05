import { Container } from "../primitives/Container";

const LOGOS = ["Northwind", "Halcyon", "Kestrel", "Atlas Bio", "Meridian", "Ironclad"];

export function LogoStrip() {
  return (
    <Container>
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low">
        // TRUSTED BY TEAMS BUILDING THE FUTURE
      </p>
      <div className="mt-10 grid grid-cols-2 items-center gap-x-10 gap-y-6 sm:grid-cols-3 md:grid-cols-6">
        {LOGOS.map((name) => (
          <div
            key={name}
            className="flex items-center justify-center"
          >
            <span className="font-display text-[20px] font-medium tracking-[-0.02em] text-fg-mid/70 grayscale opacity-70 transition-opacity duration-300 hover:opacity-100">
              {name}
            </span>
          </div>
        ))}
      </div>
    </Container>
  );
}
