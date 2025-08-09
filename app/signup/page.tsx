"use client";

import bgImage from "@/assets/dynamic-data-visualization-3d (1).jpg";
import Background from "@/components/shared/Background";
import Image from "next/image";
import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signup(form);
      if (!res?.success) {
        throw new Error(res?.message || "Signup failed");
      }
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black px-2.5 sm:px-4">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="w-full h-full object-cover blur-lg brightness-50"
          priority
        />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <Background />
      </div>

      {/* Glass Card */}
      <div className="relative z-20 bg-white/10 border border-white/20 backdrop-blur-md shadow-xl rounded-2xl p-8 sm:p-12 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="full_name"
            type="text"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            className="bg-white/10 border border-white/20 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/60"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="bg-white/10 border border-white/20 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/60"
            required
          />
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="bg-white/10 border border-white/20 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/60"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="bg-white/10 border border-white/20 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/60"
            required
          />

          {error && (
            <p className="text-red-400 text-sm mt-1 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-3 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-white/60 mt-6">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
