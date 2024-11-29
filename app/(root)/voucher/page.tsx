/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const [history, setHistory] = useState<Voucher[]>([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claimingId, setClaimingId] = useState<number | null>(null);

  // Fetch vouchers from API
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/voucher");
        if (!response.ok) {
          throw new Error("Failed to fetch vouchers");
        }

        const data: Voucher[] = await response.json();
        setVouchers(data);
        setFilteredVouchers(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unknown error occurred while fetching vouchers."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  // Redirect user to login if unauthenticated
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
    if (!session?.user?.id) {
      console.error("User is not authenticated");
      return;
    }

    setClaimingId(id); // Set loading state for specific voucher
    try {
      const response = await fetch(`/api/voucher/${id}/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error claiming voucher");
      }

      const claimedVoucher = vouchers.find((voucher) => voucher.id === id);
      if (claimedVoucher) {
        setFilteredVouchers((prevVouchers) =>
          prevVouchers.filter((voucher) => voucher.id !== id)
        );
        setHistory((prevHistory) => [...prevHistory, claimedVoucher]);
      }
    } catch (error) {
      console.error("Error claiming voucher:", error);
      alert(
        error instanceof Error ? error.message : "Failed to claim voucher."
      );
    } finally {
      setClaimingId(null); // Clear loading state
    }
  };

  if (loading) {
    return <p>Loading vouchers...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!session?.user) {
    return <p>You must be logged in to view vouchers.</p>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <div className="hidden md:block md:w-1/4">
        <div className="sticky top-0 h-screen">
          <LeftSidebar onCategorySelect={handleCategorySelect} />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-2 overflow-y-auto">
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
                    disabled={claimingId === voucher.id}
                    className={`w-full py-2 rounded-md ${
                      claimingId === voucher.id
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    {claimingId === voucher.id ? "Claiming..." : "Claim"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No vouchers available.</p>
          )}
        </div>
      </main>
    </div>
  );
}
