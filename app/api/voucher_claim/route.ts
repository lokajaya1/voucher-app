import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Sesuaikan dengan path ke file prisma Anda

// Fungsi untuk mengambil data klaim voucher berdasarkan userId
export async function GET(req: NextRequest) {
  try {
    // Ambil userId dari query parameter
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Ambil data klaim voucher dari database menggunakan Prisma
    const voucherClaims = await prisma.voucher_Claim.findMany({
      where: {
        userId: parseInt(userId), // Menggunakan userId sebagai filter
      },
      include: {
        voucher: true, // Sertakan detail voucher yang diklaim
      },
    });

    if (voucherClaims.length === 0) {
      return NextResponse.json(
        { message: "No claims found for this user" },
        { status: 404 }
      );
    }

    // Kirimkan data klaim voucher ke client
    return NextResponse.json(voucherClaims, { status: 200 });
  } catch (error) {
    console.error("Error fetching voucher claims:", error);
    return NextResponse.json(
      { message: "Failed to fetch claimed vouchers" },
      { status: 500 }
    );
  }
}
