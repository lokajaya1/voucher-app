"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import LeftSidebar from "../LeftSidebar";

interface MobileNavProps {
  currentPath: string;
  voucherSummary?: Record<string, number> | null;
}

// Placeholder component for RightSidebar
const RightSidebar: React.FC<{ voucherSummary: Record<string, number> }> = ({
  voucherSummary,
}) => (
  <div className="p-4 bg-gray-100 rounded-md">
    <h3 className="text-lg font-semibold mb-4">Voucher Summary</h3>
    {Object.entries(voucherSummary).map(([key, value]) => (
      <div key={key} className="flex justify-between py-2 border-b">
        <span>{key}</span>
        <span>{value}</span>
      </div>
    ))}
  </div>
);

const MobileNav: React.FC<MobileNavProps> = ({
  currentPath,
  voucherSummary = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderSidebarContent = () => {
    switch (currentPath) {
      case "/voucher":
        return <LeftSidebar onCategorySelect={() => setIsOpen(false)} />;
      case "/history":
        return voucherSummary ? (
          <RightSidebar voucherSummary={voucherSummary} />
        ) : (
          <p className="text-gray-500 text-sm">Loading voucher summary...</p>
        );
      default:
        return null;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="text-white hover:bg-gray-700/30 p-2 rounded-md focus:outline-none transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="p-4 bg-white rounded-lg shadow-lg max-w-[250px] overflow-y-auto"
      >
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl font-bold">LokVoucher</SheetTitle>
        </SheetHeader>

        {renderSidebarContent()}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
