/*

import NextAuth, { NextAuthOptions, User as AuthUser, Account } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { nanoid } from "nanoid";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Indicate failure due to missing credentials
        }

        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            return null; // Indicate user not found
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password!
          );

          if (!isPasswordCorrect) {
            return null; // Indicate incorrect password
          }

          return user; // Authentication successful
        } catch (error) {
          console.error("Error during credential sign-in:", error);
          return null; // Indicate an error occurred
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (account?.provider === "google") {
        try {
          const existingUser = await prisma.user.findFirst({ where: { email: user.email! } });

          if (!existingUser) {
            // Create a new user if they don't exist
            await prisma.user.create({
              data: {
                id: nanoid() + "",
                email: user.email!,
              },
            });
            return true;
          }

          // Potentially link Google account if needed in the future
          // You might check if the existing user already has a linked Google account.
          // If not, you could update the user record with Google provider information.
          // For now, we'll just allow sign-in for existing users with the same email.
          return true;
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }

      return true; // Allow sign-in for other providers by default
    },
    // Optional: Customize the session object
    // async session({ session, token, user }) {
    //   if (session?.user) {
    //     session.user.id = user.id; // Add user ID to the session
    //     // You can add other user properties here if needed
    //   }
    //   return session;
    // },
    // Optional: Customize the JWT (JSON Web Token)
    async jwt({ token, account, profile, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  // Recommended for production: Set a secret
  secret: process.env.NEXTAUTH_SECRET,
  // Optional: Define custom pages (sign in, sign out, error, etc.)
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // Used for check email page
  //   newUser: null // If set, new users will be directed here on first sign in
  // },
  // Optional: Events for lifecycle hooks
  // events: {
  //   createUser({ user }) {
  //     console.log('User created:', user);
  //   },
  //   signIn({ user, account, profile }) {
  //     console.log('User signed in:', user, account, profile);
  //   },
  // },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };    */


import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { nanoid } from "nanoid";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // 👈 include role
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // Check if user exists, else create
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              id: nanoid(),
              email: user.email!,
              role: user.role ?? "user", // 👈 default role
            },
          });
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      // First time user logs in
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "user"; // 👈 save role in token
      }
     // For OAuth (Google) users who log in after first time
  if (!user && token.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: token.email as string },
    });
    if (dbUser) {
      token.id = dbUser.id;
      token.role = dbUser.role;
    }
  }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role; // 👈 expose role in session
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

