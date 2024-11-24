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
  const [rows] = await connection.query("SELECT * FROM user");
  await connection.end();
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { username, password, email, nama } = await req.json();
  const connection = await mysql.createConnection(dbConfig);
  await connection.query(
    "INSERT INTO user (username, password, email, nama) VALUES (?, ?, ?, ?)",
    [username, password, email, nama]
  );
  await connection.end();
  return NextResponse.json({ message: "User added successfully" });
}
