import { requireProfile } from "@/lib/requireProfile";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireProfile();
  return <>{children}</>;
}
