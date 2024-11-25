import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const vouchers = await prisma.voucher.findMany();
    return NextResponse.json(vouchers, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching vouchers:", error.message);
      return NextResponse.json(
        { message: "Error fetching vouchers", error: error.message },
        { status: 500 }
      );
    }

    console.error("Unknown error occurred while fetching vouchers.");
    return NextResponse.json(
      { message: "Unknown error occurred while fetching vouchers." },
      { status: 500 }
    );
  }
}

// POST: Klaim voucher
export async function POST(req: Request) {
  try {
    const { id_user, id_voucher } = await req.json();

    // Validasi input
    if (!id_user || !id_voucher) {
      return NextResponse.json(
        { message: "User ID and Voucher ID are required." },
        { status: 400 }
      );
    }

    // Validasi apakah voucher ada
    const voucher = await prisma.voucher.findUnique({
      where: { id: id_voucher },
    });

    if (!voucher) {
      return NextResponse.json(
        { message: "Voucher not found." },
        { status: 404 }
      );
    }

    // Validasi apakah user ada
    const user = await prisma.user.findUnique({
      where: { id: id_user },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Simpan klaim ke database
    const claim = await prisma.voucher_Claim.create({
      data: {
        id_user,
        id_voucher,
      },
    });

    return NextResponse.json(
      { message: "Voucher claimed successfully.", claim },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error claiming voucher:", error.message);
      return NextResponse.json(
        { message: "Error claiming voucher", error: error.message },
        { status: 500 }
      );
    }

    console.error("Unknown error occurred while claiming voucher.");
    return NextResponse.json(
      { message: "Unknown error occurred while claiming voucher." },
      { status: 500 }
    );
  }
}
