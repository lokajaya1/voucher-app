"use client";

import { useState } from "react";

const vouchersData = [
  {
    id: 1,
    title: "Discount 20%",
    image: "/images/voucher1.jpg",
    description: "Get 20% off on your next purchase.",
  },
  {
    id: 2,
    title: "Free Shipping",
    image: "/images/voucher2.jpg",
    description: "Enjoy free shipping on all orders.",
  },
  {
    id: 3,
    title: "Buy 1 Get 1 Free",
    image: "/images/voucher3.jpg",
    description: "Buy 1 product and get another for free.",
  },
  // Add more vouchers as needed
];

export default function VoucherPage() {
  const [vouchers, setVouchers] = useState(vouchersData);
  const [history, setHistory] = useState([]);

  const handleClaim = (id) => {
    const claimedVoucher = vouchers.find((voucher) => voucher.id === id);
    setHistory([...history, claimedVoucher]);
    setVouchers(vouchers.filter((voucher) => voucher.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Available Vouchers
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vouchers.map((voucher) => (
          <div
            key={voucher.id}
            className="border rounded-lg shadow-md overflow-hidden bg-white"
          >
            <img
              src={voucher.image}
              alt={voucher.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{voucher.title}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {voucher.description}
              </p>
              <button
                onClick={() => handleClaim(voucher.id)}
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
              >
                Claim
              </button>
            </div>
          </div>
        ))}
      </div>

      {history.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Claimed Vouchers</h2>
          <ul className="list-disc ml-6 mt-2">
            {history.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
