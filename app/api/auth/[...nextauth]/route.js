import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authoptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  debug: true,

  httpOptions: {
    timeout: 10000, // 10 seconds timeout
  },

  secret: process.env.NEXTAUTH_SECRET, // Secure token signing
});

export const GET = authoptions;
export const POST = authoptions;
