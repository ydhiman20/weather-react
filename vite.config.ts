import { defineConfig } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Your Vite configuration
  define: {
    "process.env": process.env,
  },
});
