import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function requireProfile() {
  const session = await getServerSession(authOptions);


  if (!session) {
    return null;
  }

 
if (!session.user?.displayName) {
  redirect("/onboarding/name");
}

  return session;
}
