"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The primary lead capture on the site — most visitors who convert do it here.
 *
 * It asks for what a quote actually needs (service, headcount, company) rather
 * than a bare name/email/message, so an enquiry lands ready to price instead of
 * starting a round-trip. Everything past the first three fields stays optional:
 * a required field is a place to abandon, and a half-complete lead beats none.
 *
 * NOTE: the honeypot owns the field name `company`, so the real company field is
 * `organisation`. Don't rename either without changing app/api/contact/route.ts.
 */

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  organisation: z.string().optional(),
  headcount: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Please include a short message"),
  company: z.string().max(0).optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

const intentLabels: Record<string, string> = {
  quote: "Request a quote",
  payroll: "Payroll enquiry",
  hire: "Hiring / request talent",
  consulting: "Consulting enquiry",
  general: "General enquiry",
};

// The chips a visitor picks from. `key` matches the ?intent= values used across
// the site, so arriving from a service page pre-selects the right one.
const intents = [
  { key: "payroll", label: "Payroll" },
  { key: "hire", label: "Recruitment" },
  { key: "consulting", label: "Consulting" },
  { key: "general", label: "Something else" },
] as const;

const headcounts = ["1–9", "10–49", "50–199", "200+", "Not sure yet"];

export default function ContactForm() {
  const params = useSearchParams();
  const urlIntent = params.get("intent") ?? "general";

  // Only pre-select when the URL actually said something. Arriving cold with
  // "Something else" already lit reads as an assumption about the visitor —
  // null leaves the question genuinely open, and submits as "general".
  const initialChip = intents.some((i) => i.key === urlIntent)
    ? urlIntent
    : urlIntent === "quote"
      ? "payroll" // the pricing CTAs land here; payroll is the flagship
      : null;

  const [intent, setIntent] = useState<string | null>(initialChip);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { subject: intentLabels[urlIntent] ?? intentLabels.general },
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [serverMsg, setServerMsg] = useState("");

  async function onSubmit(values: FormValues) {
    setStatus("sending");
    setServerMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          intent: intent ?? "general",
          subject:
            values.subject ||
            (intent ? intentLabels[intent] : undefined) ||
            intentLabels.general,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-action/30 bg-action/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-action" />
        <h3 className="mt-4 text-xl font-semibold text-ink">Message sent</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Thanks for getting in touch. A named person has your enquiry and will
          reply within 12 hours — not a ticket queue.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Intent — asked first, because it changes what we need to know. */}
      <fieldset>
        <legend className="mb-2.5 block text-sm font-medium text-ink">
          What can we help with?
        </legend>
        <div className="flex flex-wrap gap-2">
          {intents.map((i) => {
            const active = intent === i.key;
            return (
              <button
                key={i.key}
                type="button"
                onClick={() => setIntent(i.key)}
                aria-pressed={active}
                className={cn(
                  "min-h-[44px] cursor-pointer border px-4 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "border-action bg-action text-white"
                    : "border-hairline bg-white text-ink/75 hover:border-action hover:text-action",
                )}
              >
                {i.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message} htmlFor="c-name">
          <input
            id="c-name"
            type="text"
            autoComplete="name"
            {...register("name")}
            className={inputClass(!!errors.name)}
          />
        </Field>
        <Field
          label="Company"
          hint="optional"
          error={errors.organisation?.message}
          htmlFor="c-organisation"
        >
          <input
            id="c-organisation"
            type="text"
            autoComplete="organization"
            {...register("organisation")}
            className={inputClass(!!errors.organisation)}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" error={errors.email?.message} htmlFor="c-email">
          <input
            id="c-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className={inputClass(!!errors.email)}
          />
        </Field>
        <Field
          label="Phone"
          hint="optional"
          error={errors.phone?.message}
          htmlFor="c-phone"
        >
          <input
            id="c-phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className={inputClass(!!errors.phone)}
          />
        </Field>
      </div>

      {/* Headcount is the single biggest driver of a payroll price. */}
      <Field
        label="How many people do you employ?"
        hint="optional — helps us quote"
        error={errors.headcount?.message}
        htmlFor="c-headcount"
      >
        <select
          id="c-headcount"
          defaultValue=""
          {...register("headcount")}
          className={cn(inputClass(!!errors.headcount), "cursor-pointer")}
        >
          <option value="">Select a range…</option>
          {headcounts.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" error={errors.message?.message} htmlFor="c-message">
        <textarea
          id="c-message"
          rows={5}
          {...register("message")}
          placeholder="Tell us what you need and we'll come back with a straight answer."
          className={cn(inputClass(!!errors.message), "resize-y")}
        />
      </Field>

      {/* Subject rides along for the inbox, not the visitor. */}
      <input type="hidden" {...register("subject")} />

      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...register("company")}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {status === "error" && (
        <p className="flex items-center gap-2 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4" />
          {serverMsg}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2 bg-action px-7 py-4 text-base font-medium text-white transition-colors hover:bg-action-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        <p className="flex items-center gap-2 text-xs leading-relaxed text-muted">
          <ShieldCheck className="h-4 w-4 shrink-0 text-brand" />
          No obligation, no sales calls — just an answer.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 flex items-baseline gap-2 text-sm font-medium text-ink"
      >
        {label}
        {hint && <span className="text-xs font-normal text-muted">{hint}</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full border bg-white px-3.5 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-action",
    hasError ? "border-red-400" : "border-hairline",
  );
}
