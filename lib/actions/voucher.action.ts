import { getVouchersByCategory, claimVoucher } from "@/database/voucher.model";

export async function fetchVouchers(category: string) {
  const vouchers = await getVouchersByCategory(category);
  if (!vouchers.length) {
    throw new Error("No vouchers available in this category");
  }
  return vouchers;
}

export async function handleVoucherClaim(userId: number, voucherId: number) {
  // Validasi apakah voucher valid untuk klaim
  if (!userId || !voucherId) {
    throw new Error("User ID and Voucher ID are required");
  }

  // Simpan klaim ke database
  return await claimVoucher(userId, voucherId);
}
