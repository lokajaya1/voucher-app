"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { SIDEBAR_LINKS } from "@/constants";
import Link from "next/link";
import { signOut } from "next-auth/react"; // Import signOut dari NextAuth

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

  // Fungsi logout untuk menghapus session dan redirect ke login
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false }); // Hapus session di backend
      router.push("/"); // Redirect ke halaman login
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <aside className="h-screen p-4 bg-gray-100 shadow-md flex flex-col">
      {/* Kategori */}
      <div className="flex-grow overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <ul className="space-y-2">
          {SIDEBAR_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={`block px-4 py-2 rounded-md text-gray-600 transition-all ${
                  activeCategory === link.name
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleCategoryClick(link.name)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tombol Logout */}
    </aside>
  );
};

export default LeftSidebar;
