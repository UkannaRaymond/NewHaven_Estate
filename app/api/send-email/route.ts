import InquiryEmail from "@/components/emails/InquiryEmail";
import { resend } from "@/lib/resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      // ownerEmail,
      ownerName,
      propertyTitle,
      propertyLocation,
      propertyPrice,
      propertyUrl,
      senderEmail,
      senderName,
      senderPhone,
      message,
    } = body;

    const inquiryDate = new Date().toLocaleString("en-NG");

    // send the email
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: "ukannaraymond@gmail.com",
      subject: `Property Inquiry from ${senderName}`,
      react: InquiryEmail({
        recipientName: ownerName,
        propertyTitle,
        propertyLocation,
        propertyPrice,
        propertyUrl,
        senderName,
        senderEmail,
        senderPhone,
        message,
        inquiryDate,
      }),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to send email",
      },
      {
        status: 500,
      },
    );
  }
}
