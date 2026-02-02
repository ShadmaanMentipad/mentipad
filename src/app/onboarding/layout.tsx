import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  
  if (!session) {
    redirect("/");
  }

 
  if (session.user?.displayName) {
    redirect("/");
  }

  return <>{children}</>;
}
