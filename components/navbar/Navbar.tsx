"use client";

import Link from "next/link";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="w-full bg-black text-white px-4 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">LokVoucher</h1>
        <nav className="hidden md:flex space-x-4">
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
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
