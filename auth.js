import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { connectToDB } from "@/lib/db";
// import User from "@/models/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    jwt: true
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(user);
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET
})