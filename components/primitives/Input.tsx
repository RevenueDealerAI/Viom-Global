"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  validated?: boolean;
  textarea?: boolean;
  rows?: number;
  options?: { label: string; value: string }[];
  defaultValue?: string;
  className?: string;
  error?: string;
};

export function Input({
  label,
  name,
  type = "text",
  placeholder,
  required,
  validated,
  textarea,
  rows = 4,
  options,
  defaultValue,
  className,
  error,
}: Props) {
  const id = useId();
  const [focused, setFocused] = useState(false);

  const fieldBase = cn(
    "w-full rounded-[6px] bg-elev/60 border px-4 py-[12px] text-[15px] text-fg",
    "placeholder:text-fg-low",
    "transition-[border-color,box-shadow] duration-[180ms] ease-out-expo",
    "outline-none",
    error
      ? "border-[oklch(0.65_0.12_30)]"
      : focused
        ? "border-accent shadow-[0_0_0_3px_rgba(74,222,128,0.08)]"
        : "border-line-strong hover:border-line-strong/80",
  );

  return (
    <div className={cn("flex flex-col gap-[8px]", className)}>
      <label
        htmlFor={id}
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-mid"
      >
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      <div className="relative">
        {options ? (
          <select
            id={id}
            name={name}
            required={required}
            defaultValue={defaultValue ?? ""}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={cn(fieldBase, "appearance-none pr-10")}
          >
            <option value="" disabled>
              {placeholder ?? "Select…"}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : textarea ? (
          <textarea
            id={id}
            name={name}
            required={required}
            placeholder={placeholder}
            rows={rows}
            defaultValue={defaultValue}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={cn(fieldBase, "resize-none")}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            required={required}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={fieldBase}
          />
        )}

        {validated && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-signal">
            <Check size={16} />
          </span>
        )}
        {options && !validated && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-mid">
            ▾
          </span>
        )}
      </div>
      {error && (
        <span className="font-mono text-[12px] text-[oklch(0.65_0.12_30)]">
          {error}
        </span>
      )}
    </div>
  );
}
