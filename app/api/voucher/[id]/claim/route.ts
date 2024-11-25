import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // pastikan prisma sudah diimpor dengan benar

export async function POST(req: Request, context: { params: { id: string } }) {
  try {
    // Akses params secara asinkron
    const { id: voucherIdString } = context.params;

    // Konversi voucherId ke number
    const voucherId = Number(voucherIdString);
    if (isNaN(voucherId)) {
      return NextResponse.json(
        { message: "Voucher ID must be a valid number" },
        { status: 400 }
      );
    }

    // Parsing body request
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { userId } = body;

    // Validasi userId
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Membuat klaim voucher di database
    const voucherClaimed = await prisma.voucher_Claim.create({
      data: {
        id_voucher: voucherId, // id voucher
        id_user: userId, // id user
        status: "claimed",
        tanggal_claim: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Voucher claimed successfully", data: voucherClaimed },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error claiming voucher:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
