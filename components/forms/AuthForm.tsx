"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi form
    if (mode === "register") {
      if (!name || !email) {
        setError("All fields are required");
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Invalid email format");
        return;
      }
    }

    if (!username || !password) {
      setError("Username and Password are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const endpoint =
        mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const body =
        mode === "register"
          ? { username, password, name, email }
          : { username, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Something went wrong");
        return;
      }

      router.push(mode === "login" ? "/voucher" : "/login");
    } catch (err) {
      console.error("Error during form submission:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      className="mx-auto max-w-md space-y-4 text-left"
      onSubmit={handleSubmit}
    >
      {mode === "register" && (
        <div className="space-y-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring focus:ring-gray-200"
            placeholder="Enter your name"
          />
        </div>
      )}
      {mode === "register" && (
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring focus:ring-gray-200"
            placeholder="Enter your email"
          />
        </div>
      )}
      <div className="space-y-1">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring focus:ring-gray-200"
          placeholder="Enter your username"
        />
      </div>
      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring focus:ring-gray-200"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="inline-flex w-full h-10 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
      >
        {mode === "login" ? "Login" : "Register"}
      </button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
