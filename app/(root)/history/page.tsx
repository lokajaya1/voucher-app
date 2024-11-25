"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Voucher } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [history, setHistory] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch claimed vouchers for the logged-in user
  useEffect(() => {
    if (session?.user) {
      const fetchHistory = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `/api/voucher_claim?userId=${session.user.id}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch claimed vouchers");
          }

          const data: Voucher[] = await response.json();
          setHistory(data);
        } catch (error) {
          console.error("Error fetching history:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchHistory();
    }
  }, [session?.user]);

  // Handle remove voucher from history and restore to available vouchers
  const handleRemoveClaim = async (id: number) => {
    try {
      const response = await fetch(`/api/voucher_claim`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.user.id, voucherId: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove voucher from claim");
      }

      // Remove the voucher from history and add it back to the available vouchers
      setHistory((prevHistory) =>
        prevHistory.filter((voucher) => voucher.id !== id)
      );

      // Optionally, you could trigger a re-fetch of the available vouchers or update state
      console.log("Voucher removed from claim");
    } catch (error) {
      console.error("Error removing voucher from claim:", error);
    }
  };

  if (loading) {
    return <p>Loading claimed vouchers...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">
        Your Claimed Vouchers
      </h1>
      {history.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((voucher) => (
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
                <p className="text-sm text-gray-600 mb-4">{voucher.kategori}</p>
                <button
                  onClick={() => handleRemoveClaim(voucher.id)}
                  className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-400"
                >
                  Remove Claim
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No vouchers claimed yet.</p>
      )}
    </div>
  );
}
