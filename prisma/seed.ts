import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Contoh seeding data
  await prisma.voucher.createMany({
    data: [
      {
        nama: "Diskon 35%",
        foto: "/images/voucher1.jpg",
        kategori: "Belanja",
        status: true,
      },
      {
        nama: "Diskon 50%",
        foto: "/images/voucher2.jpg",
        kategori: "Makanan",
        status: true,
      },
      {
        nama: "Diskon 15%",
        foto: "/images/voucher3.jpg",
        kategori: "Makanan",
        status: true,
      },
      {
        nama: "Cashback 50%",
        foto: "/images/voucher4.jpg",
        kategori: "Belanja",
        status: true,
      },
      {
        nama: "Diskon 70%",
        foto: "/images/voucher5.jpg",
        kategori: "Edukasi",
        status: true,
      },
      {
        nama: "Diskon 50%",
        foto: "/images/voucher6.jpg",
        kategori: "Elektronik",
        status: true,
      },
      {
        nama: "Diskon 70%",
        foto: "/images/voucher7.jpg",
        kategori: "Liburan",
        status: true,
      },
    ],
  });

  console.log("Voucher data seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
