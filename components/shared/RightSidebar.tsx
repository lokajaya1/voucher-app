import React from "react";

interface RightSidebarProps {
  voucherSummary: Record<string, number>;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ voucherSummary }) => {
  const totalVouchers = Object.values(voucherSummary).reduce(
    (acc, count) => acc + count,
    0
  );

  return (
    <aside className="hidden lg:block w-1/4 px-4 py-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4 text-center">Voucher Summary</h2>
      <div className="space-y-4">
        <ul className="space-y-2">
          {Object.entries(voucherSummary).map(([category, count]) => (
            <li
              key={category}
              className="flex justify-between p-3 bg-white rounded-lg shadow-md"
            >
              <span className="text-gray-700">{category}</span>
              <span className="font-semibold">{count}</span>
            </li>
          ))}
        </ul>
        <div className="bg-gray-600 text-white text-center py-2 rounded-lg shadow-md">
          <h3 className="font-bold text-lg">Total Vouchers</h3>
          <p className="text-xl font-semibold">{totalVouchers}</p>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
