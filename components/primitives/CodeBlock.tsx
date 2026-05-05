import { cn } from "@/lib/cn";

type Props = {
  language?: string;
  code: string;
  className?: string;
  filename?: string;
};

export function CodeBlock({ language = "ts", code, className, filename }: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card-lg border border-line-strong",
        "bg-[#0B1411] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line-dark px-4 py-3">
        <div className="flex items-center gap-[6px]">
          <span className="h-[10px] w-[10px] rounded-full bg-[#FF5F57]/40" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#FEBC2E]/40" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#28C840]/40" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-low">
          {filename ?? `${language}.ts`}
        </span>
      </div>
      <pre className="overscroll-contain-x overflow-x-auto p-5 font-mono text-[13.5px] leading-[1.6] text-fg-mid">
        <code>{highlight(code)}</code>
      </pre>
    </div>
  );
}

// Tiny inline highlighter — keywords, strings, comments. Avoids shipping shiki at runtime.
function highlight(src: string): React.ReactNode {
  const lines = src.split("\n");
  return lines.map((line, i) => (
    <span key={i} className="block">
      {tokenize(line)}
      {i !== lines.length - 1 ? "\n" : ""}
    </span>
  ));
}

const KEYWORDS = new Set([
  "import",
  "from",
  "const",
  "let",
  "var",
  "return",
  "function",
  "await",
  "async",
  "new",
  "export",
  "default",
  "if",
  "else",
  "true",
  "false",
  "null",
  "undefined",
  "type",
  "interface",
]);

function tokenize(line: string): React.ReactNode {
  const out: React.ReactNode[] = [];
  // comment
  const commentIdx = line.indexOf("//");
  let working = line;
  let commentTail: string | null = null;
  if (commentIdx >= 0) {
    working = line.slice(0, commentIdx);
    commentTail = line.slice(commentIdx);
  }

  // simple split-by tokens
  const re = /("[^"]*"|'[^']*'|`[^`]*`|\b\w+\b|[^\w]+)/g;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(working))) {
    const t = m[0];
    if (/^["'`]/.test(t)) {
      out.push(
        <span key={key++} className="text-[#7DD3A6]">
          {t}
        </span>,
      );
    } else if (KEYWORDS.has(t)) {
      out.push(
        <span key={key++} className="text-accent">
          {t}
        </span>,
      );
    } else if (/^\b\d/.test(t)) {
      out.push(
        <span key={key++} className="text-signal">
          {t}
        </span>,
      );
    } else {
      out.push(<span key={key++}>{t}</span>);
    }
  }
  if (commentTail) {
    out.push(
      <span key="c" className="text-fg-low">
        {commentTail}
      </span>,
    );
  }
  return out;
}
