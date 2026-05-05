import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className }: Props) {
  return (
    <div
      className={cn(
        "relative z-[1] mx-auto w-full max-w-container",
        "px-[clamp(20px,5vw,32px)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
