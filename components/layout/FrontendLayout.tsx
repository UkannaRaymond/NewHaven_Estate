import type { ReactNode } from "react";
import Footer from "../general/Footer";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
