"use client";

import Link from "next/link";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// Define the type for voucher summary
interface VoucherSummary {
  [category: string]: number;
}

interface VoucherClaim {
  id: number;
  voucher: {
    kategori: string; // Make sure 'kategori' exists in the voucher object
  };
}

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname(); // Get the current pathname
  const [voucherSummary, setVoucherSummary] = useState<VoucherSummary>({});

  // Fetch voucher summary from API when the session user is available
  useEffect(() => {
    if (session?.user) {
      const fetchVoucherSummary = async () => {
        try {
          const response = await fetch(
            `/api/voucher_claim?userId=${session.user.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch voucher summary");
          }
          const data: VoucherClaim[] = await response.json();

          // Calculate summary based on the fetched data
          const summary = data.reduce<VoucherSummary>((acc, item) => {
            const category = item.voucher.kategori; // Ensure 'kategori' exists

            if (category) {
              acc[category] = (acc[category] || 0) + 1;
            }

            return acc;
          }, {});

          setVoucherSummary(summary);
        } catch (error) {
          console.error("Failed to fetch voucher summary", error);
        }
      };

      fetchVoucherSummary();
    }
  }, [session?.user]);

  return (
    <header className="w-full bg-black text-white px-4 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNav currentPath={pathname} voucherSummary={voucherSummary} />
        </div>

        {/* Logo/Title */}
        <h1 className="hidden md:flex text-2xl font-bold">LokVoucher</h1>

        {/* Navigation Links */}
        <nav className="space-x-4">
          {pathname !== "/voucher" && (
            <Link href="/voucher" className="text-gray-300 hover:text-white">
              Vouchers
            </Link>
          )}
          {pathname !== "/history" && (
            <Link href="/history" className="text-gray-300 hover:text-white">
              History
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
