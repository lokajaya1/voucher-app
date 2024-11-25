"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LeftSidebar from "@/components/shared/LeftSidebar";
import { Voucher } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function VoucherPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([]);
  const [category, setCategory] = useState("All");
  const [history, setHistory] = useState<Voucher[]>([]); // Voucher yang sudah diklaim
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch vouchers from API
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/voucher");
        if (!response.ok) throw new Error("Failed to fetch vouchers");
        const data: Voucher[] = await response.json();
        setVouchers(data);
        setFilteredVouchers(data); // Set both vouchers and filtered vouchers
      } catch (error) {
        setError("Error fetching vouchers. Please try again later.");
        console.error(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  // Redirect user to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Filter vouchers by category
  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setFilteredVouchers(
      selectedCategory === "All"
        ? vouchers
        : vouchers.filter((voucher) => voucher.kategori === selectedCategory)
    );
  };

  // Handle voucher claim
  const handleClaim = async (id: number) => {
    if (!session?.user) {
      console.error("User is not authenticated");
      return;
    }

    const userId = session.user.id; // ID pengguna dari session
    const claimedVoucher = vouchers.find((voucher) => voucher.id === id);
    if (!claimedVoucher) {
      console.error("Voucher not found");
      return;
    }

    try {
      const response = await fetch("/api/voucher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, voucherId: id }),
      });

      if (!response.ok) throw new Error("Error claiming voucher");

      // Update UI after successful claim
      setHistory((prev) => [...prev, claimedVoucher]); // Add to history
      const updatedVouchers = vouchers.filter((voucher) => voucher.id !== id); // Remove from available vouchers
      setVouchers(updatedVouchers);
      setFilteredVouchers(
        updatedVouchers.filter(
          (voucher) => voucher.kategori === category || category === "All"
        )
      );
    } catch (error) {
      setError("Error claiming voucher. Please try again.");
      console.error("Error claiming voucher:", error);
    }
  };

  if (loading) {
    return <p>Loading vouchers...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!session?.user) {
    return <p>You must be logged in to view vouchers.</p>;
  }

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <LeftSidebar onCategorySelect={handleCategorySelect} />

      {/* Main Content */}
      <main className="flex-1 px-2 py-2">
        <h1 className="text-3xl font-bold text-center mb-6">
          Available Vouchers
        </h1>

        {/* Display vouchers */}
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
