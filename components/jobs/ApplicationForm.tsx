"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Loader2, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_MB = 5;
const ACCEPTED = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  message: z.string().max(2000).optional(),
  // Speculative mode only: what the candidate is actually looking for.
  desiredRole: z.string().max(120).optional(),
  // Honeypot — must stay empty
  company: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

/**
 * Serves both candidate entry points, because they post the same payload to the
 * same inbox: applying to a specific advertised role, and submitting a CV
 * speculatively for the talent pool. `speculative` swaps the locked "Applying
 * for" field for a free-text "what are you looking for", and retitles the
 * confirmation — the wiring underneath is identical.
 */
export default function ApplicationForm({
  role,
  slug,
  speculative = false,
}: {
  role: string;
  slug: string;
  speculative?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [serverMsg, setServerMsg] = useState<string>("");

  function validateFile(f: File | null): boolean {
    setFileError(null);
    if (!f) {
      setFileError("Please attach your CV.");
      return false;
    }
    if (!ACCEPTED.includes(f.type)) {
      setFileError("CV must be a PDF, DOC, or DOCX file.");
      return false;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setFileError(`CV must be under ${MAX_MB}MB.`);
      return false;
    }
    return true;
  }

  async function onSubmit(values: FormValues) {
    if (!validateFile(file)) return;
    setStatus("sending");
    setServerMsg("");

    try {
      const fd = new FormData();
      fd.append("name", values.name);
      fd.append("email", values.email);
      fd.append("phone", values.phone);
      fd.append("message", values.message ?? "");
      fd.append(
        "role",
        speculative && values.desiredRole?.trim()
          ? `${role} — looking for: ${values.desiredRole.trim()}`
          : role,
      );
      fd.append("slug", slug);
      fd.append("company", values.company ?? ""); // honeypot
      if (file) fd.append("cv", file);

      const res = await fetch("/api/apply", { method: "POST", body: fd });
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
        <h3 className="mt-4 text-xl font-semibold text-ink">
          {speculative ? "CV received" : "Application received"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {speculative ? (
            <>
              Thanks — your CV is with our recruitment team and on file. We&apos;ll
              be in touch as soon as something fits, including roles before
              they&apos;re advertised. We reply within 12 hours.
            </>
          ) : (
            <>
              Thanks for applying for <strong className="text-ink">{role}</strong>.
              We&apos;ve got your details and CV, and our team will be in touch
              about the next steps. We reply within 12 hours.
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Field label="Full name" error={errors.name?.message} htmlFor="name">
        <input
          id="name"
          type="text"
          autoComplete="name"
          {...register("name")}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" error={errors.email?.message} htmlFor="email">
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className={inputClass(!!errors.email)}
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message} htmlFor="phone">
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className={inputClass(!!errors.phone)}
          />
        </Field>
      </div>

      {speculative ? (
        <Field
          label="What are you looking for? (optional)"
          error={errors.desiredRole?.message}
          htmlFor="desiredRole"
        >
          <input
            id="desiredRole"
            type="text"
            {...register("desiredRole")}
            placeholder="e.g. Payroll, warehouse, care work, admin…"
            className={inputClass(!!errors.desiredRole)}
          />
        </Field>
      ) : (
        <Field label="Applying for" htmlFor="role">
          <input
            id="role"
            type="text"
            value={role}
            readOnly
            className={cn(inputClass(false), "bg-surface text-muted")}
          />
        </Field>
      )}

      <Field
        label="Message (optional)"
        error={errors.message?.message}
        htmlFor="message"
      >
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          placeholder={
            speculative
              ? "Anything we should know — your experience, availability, or the kind of work you want."
              : "Tell us briefly why you're a good fit."
          }
          className={cn(inputClass(!!errors.message), "resize-y")}
        />
      </Field>

      {/* CV upload */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Upload your CV <span className="text-muted">(PDF, DOC, DOCX · max {MAX_MB}MB)</span>
        </label>
        <label
          className={cn(
            "flex cursor-pointer items-center gap-3 border border-dashed px-4 py-4 transition-colors",
            fileError
              ? "border-red-400 bg-red-50"
              : file
                ? "border-action bg-action/5"
                : "border-hairline bg-white hover:border-action",
          )}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              setFile(f);
              validateFile(f);
            }}
          />
          {file ? (
            <>
              <FileText className="h-5 w-5 shrink-0 text-action" />
              <span className="truncate text-sm text-ink">{file.name}</span>
              <span className="ml-auto text-xs text-muted">
                {(file.size / 1024 / 1024).toFixed(2)}MB
              </span>
            </>
          ) : (
            <>
              <Upload className="h-5 w-5 shrink-0 text-muted" />
              <span className="text-sm text-muted">
                Click to choose a file, or drag it here
              </span>
            </>
          )}
        </label>
        {fileError && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
            <AlertCircle className="h-3.5 w-3.5" />
            {fileError}
          </p>
        )}
      </div>

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

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 bg-action px-7 py-4 text-base font-medium text-white transition-colors hover:bg-action-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending…
          </>
        ) : speculative ? (
          "Submit my CV"
        ) : (
          "Submit application"
        )}
      </button>

      <p className="text-center text-xs text-muted">
        By {speculative ? "submitting your CV" : "applying"} you agree to Rimaya
        storing your details to {speculative ? "match you to roles" : "process your application"}.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
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
