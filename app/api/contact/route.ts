import { NextResponse } from "next/server";

export const runtime = "nodejs";

const recipient = "landvilleventures@gmail.com";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid message." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Please submit a valid message." }, { status: 400 });
  }

  const { name, email, message } = payload as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json({ error: "Please complete all the fields." }, { status: 400 });
  }

  const senderName = name.trim();
  const senderEmail = email.trim();
  const senderMessage = message.trim();
  if (
    !senderName ||
    senderName.length > 120 ||
    !emailPattern.test(senderEmail) ||
    senderEmail.length > 254 ||
    !senderMessage ||
    senderMessage.length > 5000
  ) {
    return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Contact email is unavailable: RESEND_API_KEY and RESEND_FROM_EMAIL are required.");
    return NextResponse.json(
      { error: "Message delivery is not configured yet. Please email us directly at landvilleventures@gmail.com." },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: senderEmail,
      subject: "New LandVille website enquiry",
      text: `${senderMessage}\n\nFrom: ${senderName}\nEmail: ${senderEmail}`,
    }),
  });

  if (!response.ok) {
    console.error("Contact email provider returned status", response.status);
    return NextResponse.json(
      { error: "We could not send your message. Please try again or email us directly at landvilleventures@gmail.com." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
