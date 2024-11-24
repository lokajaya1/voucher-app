// File: app/(root)/history/page.tsx
"use client";

import { useState } from "react";

export default function HistoryPage() {
  const [history, setHistory] = useState([
    {
      id: 1,
      title: "Discount 20%",
      category: "Discount",
      claimedAt: "2024-11-01",
    },
    {
      id: 2,
      title: "Free Shipping",
      category: "Shipping",
      claimedAt: "2024-11-05",
    },
  ]);

  const handleRemove = (id) => {
    setHistory(history.filter((voucher) => voucher.id !== id));
  };

  const categoryCounts = history.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Claimed Vouchers</h1>

      {history.length > 0 ? (
        <div className="flex flex-col gap-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Title</th>
                <th className="border border-gray-300 p-2 text-left">
                  Category
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Claimed At
                </th>
                <th className="border border-gray-300 p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((voucher) => (
                <tr key={voucher.id}>
                  <td className="border border-gray-300 p-2">
                    {voucher.title}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {voucher.category}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {voucher.claimedAt}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleRemove(voucher.id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-bold">Statistics</h2>
            <ul className="list-disc ml-6 mt-2">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <li key={category}>
                  {category}: {count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No claimed vouchers yet.</p>
      )}
    </div>
  );
}
