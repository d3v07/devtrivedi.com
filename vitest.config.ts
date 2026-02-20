import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    alias: {
      "framer-motion": path.resolve(__dirname, "./src/test/__mocks__/framer-motion.tsx"),
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
