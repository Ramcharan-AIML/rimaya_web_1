import { Resend } from "resend";
import { site } from "./site";

type Attachment = { filename: string; content: Buffer };

interface SendArgs {
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: Attachment[];
}

/**
 * Sends an email to the client's inbox.
 * - If RESEND_API_KEY is set, delivers via Resend (with CV attachment support).
 * - Otherwise logs to the server console so the flow works in development
 *   without a key. Swap the "to"/"from" for the client's real addresses.
 */
export async function sendToInbox({
  subject,
  html,
  replyTo,
  attachments,
}: SendArgs): Promise<{ ok: boolean; delivered: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RIMAYA_INBOX || site.email;
  const from = process.env.RIMAYA_FROM || "Rimaya Website <onboarding@resend.dev>";

  if (!apiKey) {
    console.log("\n[EMAIL — no RESEND_API_KEY, logged only]");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Reply-To:", replyTo ?? "(none)");
    console.log("Attachments:", attachments?.map((a) => a.filename) ?? "(none)");
    console.log("HTML:", html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
    console.log("[END EMAIL]\n");
    return { ok: true, delivered: false };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
    ...(attachments
      ? { attachments: attachments.map((a) => ({ filename: a.filename, content: a.content })) }
      : {}),
  });

  if (error) {
    console.error("[EMAIL] Resend error:", error);
    return { ok: false, delivered: false };
  }
  return { ok: true, delivered: true };
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
