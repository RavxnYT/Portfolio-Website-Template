import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * By default it just validates and logs — perfect for demos.
 * To send real emails, wire up a provider, e.g. Resend:
 *
 *   npm install resend
 *
 *   import { Resend } from "resend";
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: "Portfolio <noreply@yourdomain.com>",
 *     to: "customer@email.com",
 *     subject: `New inquiry from ${name}`,
 *     text: `${name} (${email}) — budget ${budget}\n\n${message}`,
 *   });
 *
 * Or simply point the form at Formspree/Basin and delete this file.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    typeof message !== "string" ||
    !message.trim()
  ) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid fields" },
      { status: 400 }
    );
  }

  console.log("[contact] New inquiry:", { name, email, budget: body.budget, message });

  return NextResponse.json({ ok: true });
}
