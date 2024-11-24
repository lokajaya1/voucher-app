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
      <header className="w-full bg-black text-white px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">LokVoucher</h1>
          <nav className="space-x-4">
            <Link href="/voucher" className="text-gray-300 hover:text-white">
              Vouchers
            </Link>
            <Link href="/history" className="text-gray-300 hover:text-white">
              History
            </Link>
          </nav>
        </div>
      </header>

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
