// lib/axiosInstance.ts
import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://your-domain.com/api";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
