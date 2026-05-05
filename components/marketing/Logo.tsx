import Link from "next/link";
import { LatticeIcon } from "../three/LatticeIcon";

type Props = { href?: string };

export function Logo({ href = "/" }: Props) {
  return (
    <Link href={href} className="inline-flex items-center gap-[10px] tracking-[-0.02em]">
      <LatticeIcon size={22} />
      <span className="font-display text-[19px] font-semibold text-fg">
        Viom<span className="text-fg-mid font-normal"> Global</span>
      </span>
    </Link>
  );
}
