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
