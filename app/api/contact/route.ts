import { NextResponse } from "next/server";
import { sendToInbox, escapeHtml } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot
    if (typeof body.company === "string" && body.company.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();
    const intent = String(body.intent ?? "general").trim();
    // Optional qualifying detail — present when the enquiry is quote-shaped.
    // Never required: a missing field must not cost us the lead.
    const phone = String(body.phone ?? "").trim();
    const organisation = String(body.organisation ?? "").trim();
    const headcount = String(body.headcount ?? "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Please include a short message (at least 10 characters)." },
        { status: 400 },
      );
    }

    const html = `
      <h2>New website enquiry</h2>
      <p><strong>Intent:</strong> ${escapeHtml(intent)}</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(organisation || "—")}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
      <p><strong>Headcount:</strong> ${escapeHtml(headcount || "—")}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject || "—")}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `;

    const result = await sendToInbox({
      subject: `Enquiry (${intent}): ${subject || name}`,
      html,
      replyTo: email,
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: "We couldn't send your message. Please email us directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] error:", err);
    return NextResponse.json({ error: "Unexpected error. Please try again." }, { status: 500 });
  }
}
