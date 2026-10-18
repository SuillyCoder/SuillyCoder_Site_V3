"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle", message: "" };

const fieldClass =
  "w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelClass = "block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className={labelClass}>Name</label>
        <input type="text" id="name" name="name" required maxLength={100}
          defaultValue={state.values?.name} className={fieldClass} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>Email</label>
        <input type="email" id="email" name="email" required maxLength={254}
          defaultValue={state.values?.email} className={fieldClass} placeholder="your@email.com" />
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea id="message" name="message" rows={4} required maxLength={5000}
          defaultValue={state.values?.message} className={fieldClass} placeholder="Your message..." />
      </div>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Sending…" : "Send Message"}
      </button>

      <p role="status" aria-live="polite"
        className={state.status === "error" ? "text-sm text-red-600 dark:text-red-400" : "text-sm text-green-600 dark:text-green-400"}>
        {state.message}
      </p>
    </form>
  );
}