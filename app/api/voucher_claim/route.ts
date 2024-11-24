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
  const [rows] = await connection.query("SELECT * FROM voucher_claim");
  await connection.end();
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { id_voucher } = await req.json();
  const connection = await mysql.createConnection(dbConfig);
  await connection.query(
    "INSERT INTO voucher_claim (id_voucher, tanggal_claim) VALUES (?, NOW())",
    [id_voucher]
  );
  await connection.end();
  return NextResponse.json({ message: "Voucher claimed successfully" });
}
