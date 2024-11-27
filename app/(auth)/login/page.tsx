"use client";

import AuthForm from "@/components/forms/AuthForm";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Untuk redirect manual

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold text-center text-gray-900 sm:text-5xl">
            Login to Your Account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your vouchers and manage your claims efficiently.
          </p>
        </div>

        {/* Form Login */}
        <div className="mt-8 space-y-6">
          <AuthForm mode="login" />
        </div>

        <div className="text-center mt-4 text-sm text-gray-500">
          <p>
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-gray-900 hover:text-gray-600"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
