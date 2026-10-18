import nextEnv from "@next/env";
nextEnv.loadEnvConfig(process.cwd(), true); // same lookup rules as `next dev`

const key = process.env.RESEND_API_KEY ?? "";
const to = process.env.CONTACT_TO_EMAIL ?? "";
console.log(`key length: ${key.length} | key ends with: ${key.slice(-4)} | CONTACT_TO_EMAIL: ${to}`);
if (/[\s"']/.test(key)) console.log("WARNING: the key contains a space or quote character");

const res = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "User-Agent": "key-check/1.0" },
  body: JSON.stringify({ from: "Portfolio Contact <onboarding@resend.dev>", to: [to], subject: "Resend key check", text: "If you got this, the key works." }),
});
console.log(res.status, res.ok ? "OK - key works, check your inbox" : await res.text());