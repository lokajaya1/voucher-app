import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"; // Buat file ini untuk inisialisasi Prisma Client

export async function POST(req: Request) {
  const { username, password, name, email } = await req.json();

  if (!username || !password || !name || !email) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
        email,
      },
    });

    return NextResponse.json({ message: "Registration successful", user });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to register user",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
