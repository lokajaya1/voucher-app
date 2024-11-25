"use client";

import { useState, useEffect } from "react";
import LeftSidebar from "@/components/shared/LeftSidebar";
import { Voucher } from "@prisma/client"; // Import model Voucher from Prisma
import Image from "next/image";

export default function VoucherPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([]);
  const [category, setCategory] = useState("All");
  const [history, setHistory] = useState<Voucher[]>([]); // Menyimpan voucher yang diklaim

  // Fetch vouchers from API
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch("/api/voucher");
        if (!response.ok) throw new Error("Failed to fetch vouchers");
        const data: Voucher[] = await response.json(); // Menentukan tipe data yang diterima
        setVouchers(data);
        setFilteredVouchers(data); // Set initial filtered vouchers to all vouchers
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchVouchers();
  }, []);

  // Filter vouchers by category
  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    if (selectedCategory === "All") {
      setFilteredVouchers(vouchers);
    } else {
      setFilteredVouchers(
        vouchers.filter((voucher) => voucher.kategori === selectedCategory)
      );
    }
  };

  // Handle voucher claim
  const handleClaim = async (id: number) => {
    const userId = 1; // Ganti dengan ID pengguna yang sedang login
    try {
      const claimedVoucher = vouchers.find((voucher) => voucher.id === id);
      if (!claimedVoucher) {
        throw new Error("Voucher not found");
      }

      // Save claim to database
      const response = await fetch("/api/voucher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, voucherId: id }),
      });

      if (!response.ok) throw new Error("Error claiming voucher");

      // Update UI: Add claimed voucher to history and remove from available vouchers
      setHistory((prevHistory) => [...prevHistory, claimedVoucher]);

      // Remove claimed voucher from available vouchers
      const updatedVouchers = vouchers.filter((voucher) => voucher.id !== id);
      setVouchers(updatedVouchers);
      setFilteredVouchers(
        updatedVouchers.filter(
          (voucher) => voucher.kategori === category || category === "All"
        )
      );
    } catch (error) {
      console.error("Error claiming voucher:", error);
    }
  };

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <LeftSidebar onCategorySelect={handleCategorySelect} />

      {/* Main Content */}
      <main className="flex-1 px-2 py-2">
        <h1 className="text-3xl font-bold text-center mb-6">
          Available Vouchers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVouchers.length > 0 ? (
            filteredVouchers.map((voucher) => (
              <div
                key={voucher.id}
                className="border rounded-lg shadow-md overflow-hidden bg-white"
              >
                <Image
                  src={voucher.foto}
                  alt={voucher.nama}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{voucher.nama}</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {voucher.kategori}
                  </p>
                  <button
                    onClick={() => handleClaim(voucher.id)}
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                  >
                    Claim
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No vouchers available.</p>
          )}
        </div>

        {/* Display claimed vouchers */}
        {history.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold">Claimed Vouchers</h2>
            <ul className="list-disc ml-6 mt-2">
              {history.map((item) => (
                <li key={item.id}>{item.nama}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
