import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Your Vite configuration
  define: {
    "process.env": process.env,
  },
});
