import prisma from "@/lib/prisma";

/**
 * Fetch all vouchers from the database.
 * @returns A promise that resolves to an array of all vouchers.
 */
export async function getAllVouchers() {
  return await prisma.voucher.findMany();
}

/**
 * Fetch vouchers by category from the database.
 * If "All" is specified as the category, fetch all vouchers.
 * @param category - The category of vouchers to fetch.
 * @returns A promise that resolves to an array of vouchers in the specified category.
 */
export async function getVouchersByCategory(category: string) {
  if (category === "All") {
    return getAllVouchers();
  }
  return await prisma.voucher.findMany({
    where: { kategori: category }, // Adjusted to match "kategori" field in Prisma schema
  });
}

/**
 * Create a voucher claim for a specific user.
 * @param userId - The ID of the user claiming the voucher.
 * @param voucherId - The ID of the voucher being claimed.
 * @returns A promise that resolves to the created voucher claim.
 * @throws An error if the voucher has already been claimed by the user.
 */
export async function claimVoucher(userId: number, voucherId: number) {
  // Check if the voucher has already been claimed by this user
  const existingClaim = await prisma.voucher_Claim.findUnique({
    where: {
      voucherId_userId: { voucherId, userId },
    },
  });

  if (existingClaim) {
    throw new Error("Voucher has already been claimed by this user.");
  }

  // Create a new voucher claim
  return await prisma.voucher_Claim.create({
    data: {
      userId,
      voucherId,
    },
  });
}
