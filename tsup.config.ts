import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index-package.tsx",
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ["cjs"],
  minify: true,
})
