import { NextResponse } from "next/server";
import { sendToInbox, escapeHtml } from "@/lib/email";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    // Honeypot: bots fill hidden "company" field
    if ((form.get("company") as string)?.length) {
      return NextResponse.json({ ok: true }); // silently accept, do nothing
    }

    const name = (form.get("name") as string)?.trim() ?? "";
    const email = (form.get("email") as string)?.trim() ?? "";
    const phone = (form.get("phone") as string)?.trim() ?? "";
    const message = (form.get("message") as string)?.trim() ?? "";
    const role = (form.get("role") as string)?.trim() ?? "";
    const slug = (form.get("slug") as string)?.trim() ?? "";
    const cv = form.get("cv");

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
    }
    if (!phone || phone.length < 7) {
      return NextResponse.json({ error: "Please provide a valid phone number." }, { status: 400 });
    }
    if (!(cv instanceof File)) {
      return NextResponse.json({ error: "Please attach your CV." }, { status: 400 });
    }
    if (!ACCEPTED.includes(cv.type)) {
      return NextResponse.json(
        { error: "CV must be a PDF, DOC, or DOCX file." },
        { status: 400 },
      );
    }
    if (cv.size > MAX_BYTES) {
      return NextResponse.json({ error: "CV must be under 5MB." }, { status: 400 });
    }

    const buffer = Buffer.from(await cv.arrayBuffer());

    const html = `
      <h2>New job application</h2>
      <p><strong>Role:</strong> ${escapeHtml(role)} (${escapeHtml(slug)})</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message || "—").replace(/\n/g, "<br/>")}</p>
      <p><em>CV attached: ${escapeHtml(cv.name)}</em></p>
    `;

    const result = await sendToInbox({
      subject: `New application: ${role} — ${name}`,
      html,
      replyTo: email,
      attachments: [{ filename: cv.name || "cv", content: buffer }],
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: "We couldn't send your application. Please try again or email us directly." },
        { status: 502 },
      );
    }

    // TODO (optional "proper" version): also persist to a submissions store here.
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/apply] error:", err);
    return NextResponse.json({ error: "Unexpected error. Please try again." }, { status: 500 });
  }
}
