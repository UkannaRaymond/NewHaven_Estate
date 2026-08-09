import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import CreatePropertyModal from "@/components/modals/CreatePropertyModal";
import FilterModal from "@/components/modals/FilterModal";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
export const metadata: Metadata = {
  title: "New Haven",
  description: "New Haven Real Estate ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background">
        {children}
        <RegisterModal />
        <LoginModal />
        <CreatePropertyModal />
        <FilterModal />
      </body>
    </html>
  );
}
