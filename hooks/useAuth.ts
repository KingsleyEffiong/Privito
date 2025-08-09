"use client";

import axios from "axios";
import { createSession, deleteSession } from "@/libs/sessions";

type SignupPayload = {
  email: string;
  full_name: string;
  username: string;
  password: string;
};

type LoginPayload = {
  username: string;
  password: string;
};

type ForgotPasswordPayload = { email: string };
type ConfirmOTPPayload = { token: string };
type ResetPasswordPayload = { newPassword: string; token: string };

// Axios instance
const api = axios.create({
  baseURL: "/api/v1/",
  headers: { "Content-Type": "application/json" },
});

export default function useAuth() {
  async function signup(payload: SignupPayload) {
    try {
      const res = await api.post("auth/signup", payload);
      const { token, user } = res.data?.data || {};

      await createSession({
        user: { _id: user?.id || "" },
        token,
      });

      return {
        success: true,
        message: res.data?.message,
        data: res.data?.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || error.message || "Network error",
      };
    }
  }

  async function login(payload: LoginPayload) {
    try {
      const res = await api.post("auth/login", payload);
      const { token, user } = res.data?.data || {};

      await createSession({
        user: { _id: user?.id || "" },
        token,
      });

      return {
        success: true,
        message: res.data?.message,
        data: res.data?.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || error.message || "Network error",
      };
    }
  }

  async function forgotPassword(payload: ForgotPasswordPayload) {
    try {
      const res = await api.post("auth/forgot-password", payload);
      return {
        success: true,
        message: res.data?.message,
        data: res.data?.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || error.message || "Network error",
      };
    }
  }

  async function confirmOTP(payload: ConfirmOTPPayload) {
    try {
      const res = await api.post("auth/confirm-reset-password-token", payload);
      return {
        success: true,
        message: res.data?.message,
        data: res.data?.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || error.message || "Network error",
      };
    }
  }

  async function resetPassword(payload: ResetPasswordPayload) {
    try {
      const res = await api.post("auth/reset-password", payload);
      return {
        success: true,
        message: res.data?.message,
        data: res.data?.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || error.message || "Network error",
      };
    }
  }

  async function logoutUser() {
    try {
      await deleteSession();
      localStorage.removeItem("DefaultSocial");
      localStorage.removeItem("selectedSocial");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return {
    signup,
    login,
    forgotPassword,
    confirmOTP,
    resetPassword,
    logoutUser,
  };
}
