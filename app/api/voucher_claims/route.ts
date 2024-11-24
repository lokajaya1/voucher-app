/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Ambil semua klaim voucher
export async function GET() {
  const claims = await prisma.voucherClaim.findMany({
    include: { user: true, voucher: true },
  });
  return NextResponse.json(claims);
}

// POST: Klaim voucher
export async function POST(req: Request) {
  const body = await req.json();
  const { userId, voucherId } = body;

  try {
    const claim = await prisma.voucherClaim.create({
      data: {
        userId,
        voucherId,
      },
    });
    return NextResponse.json(claim, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal klaim voucher." },
      { status: 500 }
    );
  }
}
