import { PrismaClient } from "@prisma/client";

// Definisikan tipe untuk globalThis
interface GlobalPrisma {
  prisma: PrismaClient | undefined;
}

// Tambahkan properti global secara eksplisit
const globalForPrisma = globalThis as typeof globalThis & GlobalPrisma;

// Cegah multiple instantiation di lingkungan pengembangan
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Tambahkan logging untuk debugging
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
