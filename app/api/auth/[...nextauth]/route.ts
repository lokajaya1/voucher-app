import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Konfigurasi authOptions untuk NextAuth
export const authOptions: AuthOptions = {
  // Konfigurasi penyedia autentikasi
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          console.error("Authorization failed: Missing credentials.");
          throw new Error("Username and password are required.");
        }

        // Mencari user berdasarkan username
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          console.error(`No user found for username: ${credentials.username}`);
          throw new Error("No user found with this username.");
        }

        // Memeriksa apakah password valid
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          console.error("Invalid password for user:", credentials.username);
          throw new Error("Invalid username or password.");
        }

        // Mengembalikan informasi user yang telah terautentikasi
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],

  // Adapter untuk menggunakan Prisma
  adapter: PrismaAdapter(prisma),

  // Mengonfigurasi halaman khusus untuk login dan error
  pages: {
    signIn: "/login", // Halaman login custom
    error: "/auth/error", // Halaman error jika login gagal
  },

  // Strategi sesi menggunakan JWT
  session: {
    strategy: "jwt",
  },

  // Callback untuk mengubah JWT dan sesi pengguna
  callbacks: {
    // Menyimpan data pengguna ke dalam JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
      }
      return token;
    },

    // Menyimpan data ke sesi setelah JWT diatur
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          username: token.username as string,
        };
      }
      return session;
    },

    // Custom redirect setelah login
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url === "/") return `${baseUrl}/voucher`; // Redirect default setelah login
      return url;
    },
  },

  // Menampilkan log debug hanya di development
  debug: process.env.NODE_ENV === "development",
};

// Handler untuk NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
