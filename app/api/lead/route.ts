import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.honeypot) return NextResponse.json({ ok: true });

    // In production this writes to Supabase. For the public demo we accept and log.
    console.log("[lead]", {
      name: body.name,
      email: body.email,
      company: body.company,
      role: body.role,
      company_size: body.company_size,
      message: body.message,
      source: body.source ?? "unknown",
      ts: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
