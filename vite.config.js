import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [react()],
    resolve: {
      alias: {
        "material-ui-pack": ".",
      },
    },
    server: {
      open: true,
      port: 3000,
    },
  }
})
