import { cn } from "@/lib/cn";

type Props = {
  tone?: "dark" | "light" | "elev";
  children: React.ReactNode;
  className?: string;
  id?: string;
  noPad?: boolean;
};

export function Section({
  tone = "dark",
  children,
  className,
  id,
  noPad = false,
}: Props) {
  const toneClass =
    tone === "light"
      ? "bg-cream text-fg-on-light"
      : tone === "elev"
        ? "bg-elev text-fg"
        : "bg-ink text-fg";

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        toneClass,
        !noPad && "py-[var(--space-section)]",
        className,
      )}
    >
      {children}
    </section>
  );
}
