import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    include: [
      "tests/unit/**/*.spec.{ts,tsx}",
      // TODO: 上手く拡張機能が動かなかったので下記も足した（上の記述だけで大丈夫な認識なので、調べる）
      "tests/unit/**/**/*.spec.{ts,tsx}",
    ],
    setupFiles: ["vitest.setup.ts"],
    environment: "jsdom",
    globals: true,
  },
  resolve: {
    tsconfigPaths: true,
  },
});
