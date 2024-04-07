import connectDB from "@/db/dbConnect";
import { UserSchema } from "@/db/schema";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
    async signIn({ user, account, profile, email }) {

      try{
      await connectDB();
      const return_user = await UserSchema.findOne({email: user.email});
      if (!return_user){
        const new_user = await UserSchema.create({email: user.email, name: user.name})
        console.log({new_user});
      }
      return true;
    }catch (error){
      console.log(error);
      return false;
    }
      
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