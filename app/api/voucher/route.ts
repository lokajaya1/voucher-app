import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Pastikan prisma client diimport dengan benar

// GET endpoint untuk mengambil semua voucher
export async function GET() {
  try {
    const vouchers = await prisma.voucher.findMany(); // Mengambil semua voucher
    return NextResponse.json(vouchers, { status: 200 }); // Mengembalikan status 200
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    return NextResponse.json(
      { message: "Error fetching vouchers", error: error.message },
      { status: 500 }
    ); // Mengembalikan status 500 untuk error
  }
}

// POST endpoint untuk klaim voucher
export async function POST(req: Request) {
  try {
    const { userId, voucherId } = await req.json(); // Parsing body request untuk userId dan voucherId

    if (!userId || !voucherId) {
      return NextResponse.json(
        { message: "User ID and Voucher ID are required" },
        { status: 400 } // Status 400 jika data tidak lengkap
      );
    }

    // Menyimpan klaim voucher ke database
    const claim = await prisma.voucherClaim.create({
      data: {
        userId,
        voucherId,
      },
    });

    return NextResponse.json(
      { message: "Voucher claimed successfully", claim },
      { status: 201 } // Status 201 untuk berhasil dibuat
    );
  } catch (error) {
    console.error("Error claiming voucher:", error);
    return NextResponse.json(
      { message: "Error claiming voucher", error: error.message },
      { status: 500 } // Status 500 jika ada kesalahan saat klaim
    );
  }
}
