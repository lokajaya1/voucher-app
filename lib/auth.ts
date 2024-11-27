import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
});
