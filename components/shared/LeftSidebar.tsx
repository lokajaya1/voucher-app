"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { SIDEBAR_LINKS } from "@/constants";
import Link from "next/link";

const LeftSidebar = ({
  onCategorySelect,
}: {
  onCategorySelect: (category: string) => void;
}) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const router = useRouter(); // Initialize router

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategorySelect(category); // Mengirimkan kategori ke parent
  };

  // Fungsi logout untuk mengarahkan ke halaman autentikasi
  const handleLogout = () => {
    // Clear any authentication data if needed (like removing tokens)
    // Redirect ke halaman login
    router.push("/");
  };

  return (
    <aside className="w-64 bg-gray-100 custom-scrollbar sticky left-0 top-0 h-screen flex flex-col overflow-y-auto border-r p-6 pt-16 shadow-lg shadow-gray-500/50">
      {/* Kategori */}
      <div>
        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <ul className="space-y-2">
          {SIDEBAR_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className="block rounded-md px-4 py-2 text-gray-600 hover:bg-gray-700 hover:text-white"
                onClick={() => onCategorySelect(link.name)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tombol Logout */}
      <div className="mt-4">
        <button
          onClick={handleLogout} // Menggunakan handleLogout
          className="w-full px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default LeftSidebar;
