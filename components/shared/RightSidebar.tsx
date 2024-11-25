"use client";

import { useRouter } from "next/navigation";

const RightSidebar = ({
  claimedVouchers,
}: {
  claimedVouchers: { kategori: string }[];
}) => {
  const router = useRouter();

  // Hitung jumlah voucher per kategori
  const voucherCounts = claimedVouchers.reduce((counts, voucher) => {
    counts[voucher.kategori] = (counts[voucher.kategori] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  // Total voucher yang di-claim
  const totalClaimed = claimedVouchers.length;

  // Fungsi untuk logout
  const handleLogout = () => {
    router.push("/login"); // Arahkan ke halaman login
  };

  return (
    <aside className="w-64 bg-gray-100 p-4 border-l border-gray-200 flex flex-col justify-between h-full">
      {/* Statistik Voucher */}
      <div>
        <h2 className="text-lg font-bold mb-4">Claimed Vouchers</h2>
        {Object.keys(voucherCounts).length > 0 ? (
          <ul className="space-y-2">
            {Object.entries(voucherCounts).map(([kategori, count]) => (
              <li key={kategori} className="flex justify-between">
                <span>{kategori}</span>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No claimed vouchers yet.</p>
        )}
        <div className="border-t border-gray-300 my-4"></div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{totalClaimed}</span>
        </div>
      </div>

      {/* Tombol Logout */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default RightSidebar;
