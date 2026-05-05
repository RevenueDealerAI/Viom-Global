import { cn } from "@/lib/cn";

type Variant = "default" | "elevated" | "interactive" | "mockup";

type Props = {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
};

export function Card({
  variant = "default",
  children,
  className,
  as = "div",
}: Props) {
  const variantCls =
    variant === "elevated"
      ? "rounded-card-lg bg-elev border border-line-dark"
      : variant === "interactive"
        ? cn(
            "group relative rounded-card-lg bg-card border border-line-dark overflow-hidden",
            "transition-[transform,border-color] duration-300 ease-out-expo",
            "hover:-translate-y-[2px] hover:border-accent/40",
            "before:absolute before:left-0 before:top-0 before:h-full before:w-[1px] before:bg-accent",
            "before:scale-y-0 before:origin-top before:transition-transform before:duration-300 before:ease-out-expo",
            "hover:before:scale-y-100",
          )
        : variant === "mockup"
          ? cn(
              "relative rounded-mockup border border-line-strong overflow-hidden",
              "bg-gradient-to-br from-elev via-card to-elev",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_80px_-30px_rgba(74,222,128,0.25)]",
            )
          : "rounded-card bg-card border border-line-dark";

  const cls = cn(variantCls, className);
  if (as === "article") return <article className={cls}>{children}</article>;
  if (as === "li") return <li className={cls}>{children}</li>;
  return <div className={cls}>{children}</div>;
}
