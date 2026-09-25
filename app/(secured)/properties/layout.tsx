import { getCurrentUser } from "@/server-action/getCurrentUser";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/?auth=login");
  }
  return <>{children}</>;
}
