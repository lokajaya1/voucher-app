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

    console.error("Unknown error occurred:", error);
    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { id_user, id_voucher } = await req.json();

    if (!id_user || !id_voucher) {
      return NextResponse.json(
        { message: "User ID and Voucher ID are required" },
        { status: 400 }
      );
    }

    const claim = await prisma.voucher_Claim.create({
      data: {
        id_user,
        id_voucher,
      },
    });

    return NextResponse.json(
      { message: "Voucher claimed successfully", claim },
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

    console.error("Unknown error occurred:", error);
    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
