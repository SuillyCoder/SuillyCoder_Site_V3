"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  values?: { name: string; email: string; message: string };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: real visitors never see this field, bots fill it in.
  if (String(formData.get("website") ?? "").trim()) {
    return { status: "success", message: "Thanks! Your message has been sent." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const values = { name, email, message };
  const fail = (text: string): ContactState => ({ status: "error", message: text, values });

  if (!name || !email || !message) return fail("Please fill in all fields.");
  if (!EMAIL_RE.test(email) || email.length > 254) return fail("Please enter a valid email address.");
  if (name.length > 100) return fail("Please keep your name under 100 characters.");
  if (message.length > 5000) return fail("Please keep your message under 5,000 characters.");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL; // your email, from .env.local
  if (!apiKey || !to) {
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL environment variable.");
    return fail("The contact form isn't set up yet. Please try again later.");
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-contact-form/1.0",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio message from ${name.replace(/[\r\n]+/g, " ")}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] Resend rejected the email:", res.status, detail);
      return fail(
        process.env.NODE_ENV === "development"
          ? `Resend error ${res.status}: ${detail}`
          : "Sorry, your message couldn't be sent. Please try again later."
      );
    }
  } catch (err) {
    console.error("[contact] Could not reach Resend:", err);
    return fail(
      process.env.NODE_ENV === "development"
        ? `Could not reach Resend: ${String(err)}`
        : "Sorry, your message couldn't be sent. Please try again later."
    );
  }

  return { status: "success", message: "Thanks! Your message has been sent." };
}