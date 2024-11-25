import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // Parsing JSON dari request
    const { userId, voucherId } = await req.json();

    if (!userId || !voucherId) {
      return NextResponse.json(
        { message: "Invalid payload: userId and voucherId are required" },
        { status: 400 }
      );
    }

    // Debug log payload
    console.log("Received payload:", { userId, voucherId });

    // Buat klaim voucher
    const claim = await prisma.voucher_Claim.create({
      data: {
        id_user: parseInt(userId, 10),
        id_voucher: parseInt(voucherId, 10),
        tanggal_claim: new Date(),
        status: "PENDING", // Contoh default status
      },
    });

    return NextResponse.json({ claim }, { status: 201 });
  } catch (error) {
    console.error("Error creating claim:", error);
    return NextResponse.json(
      {
        message: "Error creating claim",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
