import prisma from "@/lib/prisma";

export async function getAllVouchers() {
  return await prisma.voucher.findMany();
}

export async function getVouchersByCategory(category: string) {
  if (category === "All") {
    return getAllVouchers();
  }
  return await prisma.voucher.findMany({
    where: { category },
  });
}

export async function claimVoucher(userId: number, voucherId: number) {
  return await prisma.voucherClaim.create({
    data: {
      userId,
      voucherId,
    },
  });
}
