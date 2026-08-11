import { formatPrice } from "@/app/property/[propertyId]/page";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";

export type InquiryEmailProps = {
  recipientName: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyPrice: string;
  propertyUrl: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  message: string;
  inquiryDate: string;
};

export default function InquiryEmail({
  recipientName,
  propertyTitle,
  propertyLocation,
  propertyPrice,
  propertyUrl,
  senderName,
  senderEmail,
  senderPhone,
  message,
  inquiryDate,
}: InquiryEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New inquiry for {propertyTitle}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Property Inquiry</Heading>

          <Text style={paragraph}>Hello {recipientName},</Text>

          <Text style={paragraph}>
            You have received a new property inquiry through NewHaven Estate.
          </Text>

          <Section style={propertyCard}>
            <Text style={propertyTitleStyle}>{propertyTitle}</Text>
            <Text style={propertyMeta}>📍 {propertyLocation}</Text>
            <Text style={propertyPriceStyle}>{formatPrice(propertyPrice)}</Text>
          </Section>

          <Section style={section}>
            <Text style={sectionTitle}>Contact Details</Text>

            <Text style={detail}>
              <strong>Name:</strong> {senderName}
            </Text>

            <Text style={detail}>
              <strong>Email:</strong> {senderEmail}
            </Text>

            {senderPhone ? (
              <Text style={detail}>
                <strong>Phone:</strong> {senderPhone}
              </Text>
            ) : null}

            <Text style={detail}>
              <strong>Inquiry Date:</strong> {inquiryDate}
            </Text>
          </Section>

          <Section style={messageBox}>
            <Text style={sectionTitle}>Inquiry Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Section style={{ textAlign: "center", margin: "32px 0" }}>
            <a
              href={propertyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#2563EB",
                color: "#ffffff",
                padding: "14px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                display: "inline-block",
                fontWeight: "700",
                fontSize: "16px",
                lineHeight: "16px",
              }}
            >
              View Property
            </a>
          </Section>

          <Text style={replyText}>
            Reply directly to this inquiry:
            <br />
            <Link href={`mailto:${senderEmail}`} style={link}>
              {senderEmail}
            </Link>
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            This inquiry was sent through NewHaven Estate.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f4f7fb",
  margin: "0",
  padding: "24px 0",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  margin: "0 auto",
  maxWidth: "600px",
  padding: "32px",
};

const heading = {
  color: "#111827",
  fontSize: "28px",
  fontWeight: "700",
  margin: "0 0 24px",
};

const paragraph = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 16px",
};

const propertyCard = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "20px",
  margin: "24px 0",
};

const propertyTitleStyle = {
  color: "#111827",
  fontSize: "20px",
  fontWeight: "700",
  margin: "0 0 8px",
};

const propertyMeta = {
  color: "#4b5563",
  fontSize: "15px",
  margin: "0 0 6px",
};

const propertyPriceStyle = {
  color: "#2563EB",
  fontSize: "18px",
  fontWeight: "700",
  margin: "0",
};

const section = {
  margin: "24px 0",
};

const sectionTitle = {
  color: "#111827",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 12px",
};

const detail = {
  color: "#374151",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 0 8px",
};

const messageBox = {
  backgroundColor: "#ffffff",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  padding: "20px",
  margin: "24px 0",
};

const messageText = {
  color: "#374151",
  fontSize: "15px",
  lineHeight: "26px",
  whiteSpace: "pre-wrap" as const,
  margin: "0",
};

const replyText = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0 0 24px",
};

const link = {
  color: "#2563EB",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0 20px",
};

const footer = {
  color: "#6b7280",
  fontSize: "12px",
  lineHeight: "20px",
  textAlign: "center" as const,
};
