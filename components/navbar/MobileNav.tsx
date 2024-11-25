import { useState } from "react";
import Link from "next/link";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        className="text-white focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6h16.5M3.75 12h16.5M3.75 18h16.5"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
          <Link
            href="/voucher"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Vouchers
          </Link>
          <Link
            href="/history"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            History
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
