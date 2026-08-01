"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Email signup for /lab. Double opt-in — this only starts the process.
 *
 * Styled in the section's own language: a hairline-ruled input and a readout label,
 * not a boxed newsletter card. The marketing site already has boxed CTAs and this
 * reader has just finished 2,700 words; a shouting signup panel is the fastest way to
 * make the page feel like every other blog.
 *
 * The promise in the label is deliberately small and literal ("a few emails a year").
 * Over-promising cadence is how a list gets marked as spam by the people on it.
 */
export default function SubscribeForm({ source }: { source: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;

    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = (await res.json()) as { message?: string; error?: string };

      if (res.ok) {
        setState("done");
        setMessage(data.message ?? "Check your email to confirm.");
        track("lab_subscribe", { source });
      } else {
        setState("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setState("error");
      setMessage("Network error. Try again in a moment.");
    }
  }

  if (state === "done") {
    return (
      <aside className="mt-12 pt-5 border-t border-border">
        <p className="lab-readout text-signal">Almost there</p>
        <p className="font-prose text-[17px] leading-[28px] text-muted-foreground mt-2 max-w-[52ch]">
          {message}
        </p>
      </aside>
    );
  }

  return (
    <aside className="mt-12 pt-5 border-t border-border">
      <p className="lab-readout text-muted-foreground">New posts by email</p>

      <form onSubmit={submit} className="mt-3 flex flex-wrap items-center gap-2">
        <label htmlFor={`sub-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`sub-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          className="font-readout text-[13px] bg-transparent text-foreground placeholder:text-muted-foreground/60 border-b border-border focus:border-signal focus:outline-none py-1.5 px-1 w-[min(100%,17rem)] transition-colors"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="lab-readout border border-border text-foreground px-3 py-2 rounded-[3px] hover:border-signal hover:text-signal disabled:opacity-50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {state === "sending" ? "Sending…" : "Subscribe"}
        </button>
      </form>

      <p className="font-prose text-[15px] leading-[24px] text-muted-foreground mt-3 max-w-[52ch]">
        A few emails a year, when there is a new post. Nothing else, ever — and one click
        to leave.
      </p>

      {state === "error" && (
        // aria-live so a screen reader hears the failure; the visual change alone is
        // not an announcement.
        <p className="lab-readout text-destructive mt-2" aria-live="polite">
          {message}
        </p>
      )}
    </aside>
  );
}
