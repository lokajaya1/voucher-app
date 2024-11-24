/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Ambil semua voucher
export async function GET() {
  const vouchers = await prisma.voucher.findMany({
    include: { claims: true },
  });
  return NextResponse.json(vouchers);
}

// POST: Tambah voucher baru
export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, image, category } = body;

  try {
    const voucher = await prisma.voucher.create({
      data: {
        title,
        description,
        image,
        category,
      },
    });
    return NextResponse.json(voucher, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal membuat voucher." },
      { status: 500 }
    );
  }
}
