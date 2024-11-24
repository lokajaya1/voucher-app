/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// GET: Ambil semua pengguna
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { claims: true }, // Mengambil data claims juga
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data pengguna." },
      { status: 500 }
    );
  }
}

// POST: Tambah pengguna baru
export async function POST(req: Request) {
  const body = await req.json();
  const { username, password, name, email } = body;

  // Validasi input
  if (!username || !password || !name || !email) {
    return NextResponse.json(
      { error: "Semua field harus diisi." },
      { status: 400 }
    );
  }

  try {
    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru ke database
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword, // Password yang di-hash
        name,
        email,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    // Tangani error yang mungkin terjadi saat pembuatan user
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Gagal membuat pengguna." },
      { status: 500 }
    );
  }
}
