import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import checker from "vite-plugin-checker"
import eslint from "vite-plugin-eslint"

export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [
      react(),
      checker({ typescript: true }),
      eslint({ failOnWarning: mode === "production" }),
    ],
    server: {
      open: true,
      port: 3000,
    },
  }
})
