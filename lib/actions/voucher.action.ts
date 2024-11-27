import { getVouchersByCategory, claimVoucher } from "@/database/voucher.model";

/**
 * Fetch vouchers based on a specific category.
 * If "All" is passed as the category, fetch all vouchers.
 * @param category - The category to fetch vouchers for.
 * @returns A promise that resolves to an array of vouchers.
 * @throws An error if no vouchers are available in the given category.
 */
export async function fetchVouchers(category: string) {
  const vouchers = await getVouchersByCategory(category);
  if (!vouchers.length) {
    throw new Error("No vouchers available in this category");
  }
  return vouchers;
}

/**
 * Handle a user's voucher claim.
 * @param userId - The ID of the user claiming the voucher.
 * @param voucherId - The ID of the voucher being claimed.
 * @returns A promise that resolves to the created voucher claim.
 * @throws An error if the userId or voucherId is invalid.
 */
export async function handleVoucherClaim(userId: number, voucherId: number) {
  // Validate input parameters
  if (!userId || !voucherId) {
    throw new Error("User ID and Voucher ID are required");
  }

  // Save the voucher claim in the database
  return await claimVoucher(userId, voucherId);
}
