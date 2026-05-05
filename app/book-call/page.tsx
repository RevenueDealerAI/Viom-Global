"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Input } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

export default function BookCallPage() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (data.honeypot) return; // bot
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        body: JSON.stringify({ ...data, source: "book-call" }),
      });
      if (!res.ok) throw new Error("server");
      setDone(true);
    } catch {
      setError("Something broke on our end. Try again, or email hello@viom.global.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section tone="dark" noPad className="pt-[140px]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-7">
            <Eyebrow>// STRATEGY CALL</Eyebrow>
            <h1 className="h1">
              <span className="acc">45 minutes that pays for itself</span>
              <span className="wht">or your time back.</span>
            </h1>
            <ul className="flex flex-col gap-4">
              {[
                "A senior AI architect on the call — not a sales rep",
                "Walk away with a concrete automation map for your top 3 workflows",
                "If we can't help, we'll tell you who can",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-[16px] text-fg">
                  <span className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-signal/20 text-signal">
                    <Check size={12} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <figure className="mt-6 max-w-[520px] rounded-card-lg border-l-2 border-accent/40 bg-card/50 px-6 py-5">
              <blockquote className="font-mono text-[14px] leading-[1.6] text-fg">
                "Cleanest 45 minutes I've spent in a procurement cycle. They mapped two workflows and disqualified themselves from a third — no upsell."
              </blockquote>
              <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-low">
                — VP Engineering · Tier-1 healthcare payer
              </figcaption>
            </figure>
          </div>

          <Card variant="mockup" className="p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between border-b border-line-dark pb-4">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-mid">
                <span className="h-[6px] w-[6px] rounded-full bg-signal" />
                Live · scheduling
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-low">
                response · &lt; 2h
              </span>
            </div>

            {done ? (
              <div className="flex flex-col items-start gap-4 py-10">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-signal/20 text-signal">
                  <Check size={20} />
                </span>
                <h3 className="text-[24px] font-semibold text-fg">
                  Got it. We'll be in touch within 2 hours.
                </h3>
                <p className="text-[15px] text-fg-mid">
                  A senior architect will reach out from <span className="font-mono text-accent">hello@viom.global</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4">
                <input type="text" name="honeypot" hidden tabIndex={-1} autoComplete="off" />
                <Input label="Full name" name="name" required />
                <Input label="Work email" name="email" type="email" required />
                <Input label="Company" name="company" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Role"
                    name="role"
                    options={[
                      { label: "Engineering Lead", value: "engineering" },
                      { label: "Ops Lead", value: "ops" },
                      { label: "Product", value: "product" },
                      { label: "Data", value: "data" },
                      { label: "Founder/CEO", value: "founder" },
                      { label: "Other", value: "other" },
                    ]}
                    required
                  />
                  <Input
                    label="Company size"
                    name="company_size"
                    options={[
                      { label: "1–50", value: "1-50" },
                      { label: "51–250", value: "51-250" },
                      { label: "251–1000", value: "251-1000" },
                      { label: "1000+", value: "1000+" },
                    ]}
                    required
                  />
                </div>
                <Input
                  label="What are you trying to solve?"
                  name="message"
                  textarea
                  rows={4}
                  placeholder="Be specific. Volume, systems, current pain."
                />
                {error && (
                  <p className="font-mono text-[12.5px] text-[oklch(0.65_0.12_30)]">{error}</p>
                )}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    arrow
                    className="w-full justify-center sm:w-auto"
                  >
                    {busy ? "Sending…" : "Get on the calendar"}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </Container>
    </Section>
  );
}
