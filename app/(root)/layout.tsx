import Navbar from "@/components/shared/navbar/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Voucher App",
  description: "Manage your vouchers and claims",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-white text-black">
      {/* Navbar */}
      <Navbar />

      {/* Layout Body */}
      <div className="flex">
        {/* Main Content */}
        <section className="flex-1 px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
      </div>
    </main>
  );
}
