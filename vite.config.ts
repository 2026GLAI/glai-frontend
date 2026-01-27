import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: true,          // позволяет открывать с телефона
    port: 5173,
    strictPort: true,
  },

  preview: {
    host: true,
    port: 5173,
    strictPort: true,
  },

  base: "/",             // важно для refresh (F5)
});
