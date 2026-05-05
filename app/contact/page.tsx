"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Input } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

const OFFICES = [
  { city: "San Francisco", lines: ["340 Brannan St, Floor 3", "San Francisco, CA 94107"] },
  { city: "London", lines: ["12 New Fetter Lane", "London EC4A 1AG"] },
  { city: "Singapore", lines: ["80 Robinson Rd, #15-02", "Singapore 068898"] },
];

export default function ContactPage() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (data.honeypot) return;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        body: JSON.stringify({ ...data, source: "contact" }),
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
    <Section tone="dark" noPad className="pt-[140px] pb-[100px]">
      <Container>
        <div className="mb-16 flex flex-col gap-4">
          <Eyebrow>// CONTACT</Eyebrow>
          <h1 className="h1 max-w-[820px]">
            <span className="acc">Tell us what you're trying to solve.</span>
            <span className="wht">We'll tell you whether we can help.</span>
          </h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Card variant="default" className="p-7 md:p-9">
            {done ? (
              <div className="flex flex-col items-start gap-4 py-10">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-signal/20 text-signal">
                  <Check size={20} />
                </span>
                <h3 className="text-[24px] font-semibold text-fg">
                  Got it. We'll be in touch within 2 hours.
                </h3>
                <p className="text-[15px] text-fg-mid">
                  Reply will come from <span className="font-mono text-accent">hello@viom.global</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4">
                <input type="text" name="honeypot" hidden tabIndex={-1} autoComplete="off" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Full name" name="name" required />
                  <Input label="Work email" name="email" type="email" required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Company" name="company" required />
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
                </div>
                <Input
                  label="What are you trying to solve?"
                  name="message"
                  textarea
                  rows={5}
                  placeholder="Be specific. Volume, systems, current pain."
                  required
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
                    {busy ? "Sending…" : "Send message"}
                  </Button>
                </div>
              </form>
            )}
          </Card>

          <div className="flex flex-col gap-10">
            <div>
              <Eyebrow dot={false}>// OFFICES</Eyebrow>
              <ul className="mt-4 grid gap-6 sm:grid-cols-2">
                {OFFICES.map((o) => (
                  <li key={o.city} className="flex flex-col gap-2">
                    <span className="font-display text-[15px] font-semibold text-fg">
                      {o.city}
                    </span>
                    <address className="font-mono text-[12.5px] not-italic leading-[1.7] text-fg-mid">
                      {o.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                    <a
                      href="#"
                      className="mt-1 inline-flex items-center gap-2 text-[12.5px] text-accent"
                    >
                      View on map →
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Eyebrow dot={false}>// PRESS &amp; PARTNERSHIPS</Eyebrow>
              <ul className="mt-4 flex flex-col gap-2 font-mono text-[13.5px] text-fg-mid">
                <li>press · <span className="text-accent">press@viom.global</span></li>
                <li>partners · <span className="text-accent">partners@viom.global</span></li>
                <li>security · <span className="text-accent">security@viom.global</span></li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
