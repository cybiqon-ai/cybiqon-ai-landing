"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/data/launch5";

/**
 * The application form, as a ruled document rather than a card of floating inputs.
 *
 * Fields sit on hairline rules with the label in the left column — the same label/value
 * structure the rest of the page uses, because a form genuinely is one of these. No
 * toast on success: the form replaces itself with the answer, so the confirmation
 * cannot be missed or dismissed. (The toasters portal to document.body and escape the
 * theme scope anyway — see components/ThemeScope.tsx.)
 */

// Mirrors app/api/apply/route.ts. The server is the authority; this exists so someone
// filling in a form on a slow connection finds out about a typo immediately.
const applySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  business: z.string().trim().min(2, "Please enter your business name").max(120),
  phone: z
    .string()
    .trim()
    .refine(
      (v) => /^[6-9]\d{9}$/.test(v.replace(/[\s-]/g, "").replace(/^(\+?91)/, "")),
      "Enter a 10-digit Indian mobile number"
    ),
  email: z.string().trim().email("That email address doesn't look right").max(120).optional().or(z.literal("")),
  city: z.string().trim().min(2, "Please enter your city").max(80),
  about: z.string().trim().min(10, "One or two lines is fine").max(1000),
  current_url: z.string().trim().max(300).optional().or(z.literal("")),
  agreed_trade: z.literal(true, {
    errorMap: () => ({ message: "The free site is a trade — please confirm you're in" }),
  }),
});

type ApplyFormValues = z.infer<typeof applySchema>;

const FIELD =
  "w-full border-0 border-b border-border bg-transparent px-0 py-2 text-[15px] text-foreground " +
  "placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-0 " +
  "transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]";

const LABEL =
  "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground pt-3";

function Row({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-x-6 gap-y-1 border-b border-border py-4 md:grid-cols-[10rem_1fr] md:py-5">
      <label className={LABEL}>
        {label}
        {hint && (
          <span className="ml-2 font-normal normal-case tracking-normal text-muted-foreground/70">
            {hint}
          </span>
        )}
      </label>
      <div>
        {children}
        {error && <p className="mt-1.5 text-[13px] text-destructive">{error}</p>}
      </div>
    </div>
  );
}

export default function ApplyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      name: "",
      business: "",
      phone: "",
      email: "",
      city: "",
      about: "",
      current_url: "",
    },
  });

  const onSubmit = async (values: ApplyFormValues) => {
    setFormError(null);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: { success?: boolean; error?: string } = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setFormError(
        `Network error — nothing was sent. Please try again, or message ${WHATSAPP_DISPLAY} on WhatsApp.`
      );
    }
  };

  if (submitted) {
    return (
      <div className="border-t-2 border-rule-strong/30 pt-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          Application received
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
          I&apos;ll message you on WhatsApp within 24 hours.
        </h3>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Either way — if it&apos;s a no, you&apos;ll still hear back. Nothing else is
          needed from you until then.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center border border-border px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-foreground transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-muted"
        >
          Message me now instead
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="border-t-2 border-rule-strong/30">
        <Row label="Your name" error={errors.name?.message}>
          <input className={FIELD} placeholder="Rajesh Kumar" {...register("name")} />
        </Row>

        <Row label="Business name" error={errors.business?.message}>
          <input className={FIELD} placeholder="Sharma Electricals" {...register("business")} />
        </Row>

        <Row label="City" error={errors.city?.message}>
          <input className={FIELD} placeholder="Nagpur" {...register("city")} />
        </Row>

        <Row label="WhatsApp number" error={errors.phone?.message}>
          <input
            className={FIELD}
            type="tel"
            inputMode="numeric"
            placeholder="9876543210"
            {...register("phone")}
          />
        </Row>

        <Row label="Email" hint="optional" error={errors.email?.message}>
          <input className={FIELD} type="email" placeholder="you@business.com" {...register("email")} />
        </Row>

        <Row label="Online now" hint="optional" error={errors.current_url?.message}>
          <input
            className={FIELD}
            placeholder="Instagram, JustDial, an old site — anything"
            {...register("current_url")}
          />
        </Row>

        <Row label="What you do" error={errors.about?.message}>
          <textarea
            className={`${FIELD} min-h-[5.5rem] resize-y`}
            placeholder="What the business sells, who buys it, and what you want the website to do."
            {...register("about")}
          />
        </Row>

        <div className="border-b border-border py-5">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 shrink-0 accent-primary"
              {...register("agreed_trade")}
            />
            <span className="text-[15px] leading-relaxed text-foreground">
              I&apos;m in on the trade — a 60-second video, a Google review, use of my
              name and logo, and my before/after numbers for a case study.
            </span>
          </label>
          {errors.agreed_trade && (
            <p className="mt-1.5 text-[13px] text-destructive">{errors.agreed_trade.message}</p>
          )}
        </div>
      </div>

      {formError && (
        <p className="mt-5 border-l-2 border-destructive pl-4 text-[15px] leading-relaxed text-destructive">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-primary px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.99] disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
            Sending
          </>
        ) : (
          "Apply for a slot"
        )}
      </button>

      <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
        No obligation. Applying does not commit you to anything — the trade is agreed in
        writing after we talk, or not at all.
      </p>
    </form>
  );
}
