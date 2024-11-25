import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Pastikan Prisma Client sudah diatur di lib/prisma.ts

// GET: Mengambil semua user
export async function GET() {
  try {
    const users = await prisma.user.findMany(); // Mengambil semua data user
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
}

// POST: Menambahkan user baru
export async function POST(req: Request) {
  try {
    const { username, password, email, name } = await req.json();

    // Validasi data input
    if (!username || !password || !email || !name) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Menambahkan data user ke database
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email,
        name,
      },
    });

    return NextResponse.json({
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ message: "Error adding user" }, { status: 500 });
  }
}
