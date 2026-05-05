import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArrowGlyph } from "./ArrowGlyph";

type Variant = "primary" | "secondary" | "ghost-link";

type Props = {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
  arrow?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  size?: "default" | "sm";
};

export function Button({
  variant = "primary",
  href,
  children,
  arrow,
  onClick,
  className,
  type = "button",
  ariaLabel,
  size = "default",
}: Props) {
  const showArrow = arrow ?? variant !== "ghost-link";

  const sizeClass =
    size === "sm"
      ? "px-[18px] py-[9px] text-[13.5px]"
      : "px-6 py-[14px] text-[15px]";

  const base = cn(
    "group inline-flex items-center gap-[10px] font-medium",
    "transition-[transform,box-shadow,background,color,border-color] duration-200 ease-out-expo",
    "whitespace-nowrap tracking-[-0.005em] relative",
  );

  const variantCls =
    variant === "primary"
      ? cn(
          "rounded-pill bg-accent text-ink",
          "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_8px_24px_-10px_rgba(74,222,128,0.4)]",
          "hover:-translate-y-[1px] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_14px_30px_-8px_rgba(74,222,128,0.5)]",
          sizeClass,
        )
      : variant === "secondary"
        ? cn(
            "rounded-pill border border-accent text-accent",
            "hover:-translate-y-[1px] hover:bg-accent/10",
            sizeClass,
          )
        : cn(
            "text-accent",
            "after:absolute after:left-0 after:right-0 after:-bottom-[3px] after:h-[1px] after:bg-current",
            "after:scale-x-0 after:origin-left after:transition-transform after:duration-[250ms] after:ease-out-expo",
            "hover:after:scale-x-100",
          );

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span className="inline-block transition-transform duration-200 ease-out-expo group-hover:translate-x-1">
          <ArrowGlyph />
        </span>
      )}
    </>
  );

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={cn(base, variantCls, className)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className={cn(base, variantCls, className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(base, variantCls, className)}
    >
      {content}
    </button>
  );
}
