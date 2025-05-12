import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import checker from "vite-plugin-checker"

export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [react(), checker({ typescript: true })],
    server: {
      open: true,
      port: 3000,
    },
  }
})
