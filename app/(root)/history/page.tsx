"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RightSidebar from "@/components/shared/RightSidebar";

interface VoucherClaim {
  id: number;
  userId: number;
  voucherId: number;
  createdAt: string;
  voucher: {
    id: number;
    nama: string;
    foto: string;
    kategori: string;
  };
}

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [history, setHistory] = useState<VoucherClaim[]>([]);
  const [loading, setLoading] = useState(true);
  const [voucherSummary, setVoucherSummary] = useState<Record<string, number>>(
    {}
  );

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

          const data: VoucherClaim[] = await response.json();
          setHistory(data);

          // Update summary
          const summary = data.reduce<Record<string, number>>((acc, claim) => {
            const category = claim.voucher.kategori;
            acc[category] = (acc[category] || 0) + 1;
            return acc;
          }, {});
          setVoucherSummary(summary);
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
  const handleRemoveClaim = async (id: number, kategori: string) => {
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

      // Update the history and summary
      setHistory((prevHistory) =>
        prevHistory.filter((claim) => claim.voucher.id !== id)
      );
      setVoucherSummary((prevSummary) => ({
        ...prevSummary,
        [kategori]: prevSummary[kategori] - 1,
      }));

      console.log("Voucher removed from claim");
    } catch (error) {
      console.error("Error removing voucher from claim:", error);
    }
  };

  if (loading) {
    return <p>Loading claimed vouchers...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Main Content */}
      <div className="flex-1">
        <header className="p-4 text-dark text-center">
          <h1 className="text-2xl font-bold">History of Claimed Vouchers</h1>
        </header>
        <main className="p-4">
          {history.length > 0 ? (
            <table className="min-w-full border-collapse table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Voucher</th>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Claimed At</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {history.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border flex items-center">
                      <Image
                        src={claim.voucher.foto}
                        alt={claim.voucher.nama}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span className="ml-4">{claim.voucher.nama}</span>
                    </td>
                    <td className="px-4 py-2 border">
                      {claim.voucher.kategori}
                    </td>
                    <td className="px-4 py-2 border">
                      {new Date(claim.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() =>
                          handleRemoveClaim(
                            claim.voucher.id,
                            claim.voucher.kategori
                          )
                        }
                        className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-400"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No vouchers claimed yet.</p>
          )}
        </main>
      </div>

      {/* Sidebar */}
      <RightSidebar voucherSummary={voucherSummary} />
    </div>
  );
}
