import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Mengambil data klaim dengan relasi user dan voucher
export async function GET() {
  try {
    const claims = await prisma.voucher_Claim.findMany({
      include: {
        voucher: true,
        user: true,
      },
    });

    const formattedClaims = claims.map((claim) => ({
      id: claim.id,
      voucherName: claim.voucher.nama,
      category: claim.voucher.kategori,
      claimedAt: claim.tanggal_claim,
      status: claim.status,
      username: claim.user.username,
    }));

    return NextResponse.json(formattedClaims);
  } catch (error) {
    console.error("Error fetching voucher claims:", error);
    return NextResponse.json(
      { message: "Error fetching claims" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { id_voucher, id_user } = await req.json();

    console.log("Received data:", { id_voucher, id_user });

    if (!id_voucher || !id_user) {
      return NextResponse.json(
        { message: "Voucher ID and User ID are required" },
        { status: 400 }
      );
    }

    const newClaim = await prisma.voucher_Claim.create({
      data: {
        id_voucher,
        id_user,
        status: "claimed",
      },
    });

    return NextResponse.json({
      message: "Voucher claimed successfully",
      newClaim,
    });
  } catch (error) {
    console.error("Error creating claim:", error); // Pastikan log ini muncul
    return NextResponse.json(
      { message: "Error creating claim" },
      { status: 500 }
    );
  }
}
