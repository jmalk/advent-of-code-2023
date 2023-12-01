import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["day-template", "node_modules"],
  },
});
