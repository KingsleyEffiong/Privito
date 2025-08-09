"use client";

import { useState } from "react";
import bgImage from "@/assets/dynamic-data-visualization-3d (1).jpg";
import Background from "@/components/shared/Background";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

function Page() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await login(formData);

      // Only redirect if login was successful
      if (!res?.success) {
        throw new Error(res?.message || "Login failed");
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
      {/* Background image */}
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

      {/* Login form */}
      <div className="relative z-20 bg-white/10 border border-white/20 backdrop-blur-md shadow-xl rounded-2xl p-8 sm:p-12 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="bg-white/10 border border-white/20 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/60"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="bg-white/10 border border-white/20 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/60"
            required
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-3 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-sm text-center text-white/60 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}

export default Page;
