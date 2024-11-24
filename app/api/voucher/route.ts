import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "horus_loka_db",
};

export async function GET() {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.query("SELECT * FROM voucher");
  await connection.end();
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { nama, foto, kategori, status } = await req.json();
  const connection = await mysql.createConnection(dbConfig);
  await connection.query(
    "INSERT INTO voucher (nama, foto, kategori, status) VALUES (?, ?, ?, ?)",
    [nama, foto, kategori, status]
  );
  await connection.end();
  return NextResponse.json({ message: "Voucher added successfully" });
}
