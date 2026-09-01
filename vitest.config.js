import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["test/javascript/setup.js"],
    include: ["test/javascript/**/*.test.js"],
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: "v8",
      include: ["app/javascript/controllers/**/*.js"],
      reporter: ["text", "html"]
    }
  }
})
