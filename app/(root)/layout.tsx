"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/shared/navbar/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <main className="bg-white text-black min-h-screen">
        <Navbar />

        <div className="flex">
          <section className="flex min-h-screen flex-1 flex-col pb-6 pt-6 max-md:pb-14">
            <div className="mx-auto w-full">{children}</div>
          </section>
        </div>
      </main>
    </SessionProvider>
  );
}
