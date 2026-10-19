import { NextResponse } from "next/server";

export const runtime = "nodejs";

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
  const recipient = process.env.CONTACT_EMAIL?.trim();
  const from = process.env.EMAIL_FROM || process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from || !recipient || !emailPattern.test(recipient)) {
    console.error("Contact email is unavailable: RESEND_API_KEY, EMAIL_FROM (or RESEND_FROM_EMAIL), and a valid CONTACT_EMAIL are required.");
    return NextResponse.json(
      { error: "Message delivery is not configured yet. Please call us using the number on our contact page." },
      { status: 503 },
    );
  }

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
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
  } catch (error) {
    console.error("Contact email request to Resend failed:", error);
    return NextResponse.json(
      { error: "We could not send your message. Please try again or call us using the number on our contact page." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    console.error("Contact email provider returned status", response.status);
    return NextResponse.json(
      { error: "We could not send your message. Please try again or call us using the number on our contact page." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
