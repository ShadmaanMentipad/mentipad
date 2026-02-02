import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      const exists = await User.findOne({ email: user.email });
      if (!exists) {
       const adminEmail = "mentipad1@gmail.com";

if (!exists) {
  await User.create({
    email: user.email,
    googleName: user.name,
    image: user.image,
    role: user.email === adminEmail ? "admin" : "student",
  });
}

      }

      return true;
    },

    async jwt({ token }) {
      await connectDB();

      if (token.email) {
        const dbUser = await User.findOne({ email: token.email });

        if (dbUser) {
          token.displayName = dbUser.displayName;
          token.role = dbUser.role;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.displayName = token.displayName || null;
        session.user.role = token.role as string;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
