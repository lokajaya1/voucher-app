import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Validasi awal untuk parameter ID
  if (!id || isNaN(parseInt(id))) {
    return NextResponse.json(
      { error: "ID voucher tidak valid" },
      { status: 400 }
    );
  }

  try {
    // Parse body request
    const body = await req.json();
    const { userId } = body;

    // Validasi userId
    if (!userId || isNaN(parseInt(userId))) {
      return NextResponse.json(
        { error: "User ID wajib disertakan dan harus berupa angka" },
        { status: 400 }
      );
    }

    const voucherId = parseInt(id);
    const parsedUserId = parseInt(userId);

    // Cek apakah voucher ada
    const voucher = await prisma.voucher.findUnique({
      where: { id: voucherId },
    });

    if (!voucher) {
      return NextResponse.json(
        { error: "Voucher tidak ditemukan" },
        { status: 404 }
      );
    }

    // Cek apakah voucher sudah diklaim oleh user ini
    const existingClaim = await prisma.voucher_Claim.findFirst({
      where: {
        voucherId,
        userId: parsedUserId,
      },
    });

    if (existingClaim) {
      return NextResponse.json(
        { error: "Voucher sudah diklaim oleh user ini" },
        { status: 400 }
      );
    }

    // Jika belum diklaim, klaim voucher
    const newClaim = await prisma.voucher_Claim.create({
      data: {
        voucherId,
        userId: parsedUserId,
      },
    });

    // Kembalikan response klaim berhasil
    return NextResponse.json(newClaim, { status: 201 });
  } catch (error) {
    console.error("Error klaim voucher:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
