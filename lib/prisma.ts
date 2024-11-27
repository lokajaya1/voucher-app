import { PrismaClient } from "@prisma/client";

// Membuat global prisma di development untuk menghindari reconnecting pada setiap refresh halaman.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  // Di lingkungan development, kita menggunakan global instance supaya Prisma Client tidak dibuat ulang
  globalForPrisma.prisma = prisma;
}

export default prisma;
