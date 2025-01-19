import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  // Configuration for development mode
  root: "./examples", // Set the examples directory as the root

  // Build settings (library mode)
  build: {
    // Settings for building the library
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueMovingLight",
      fileName: (format) => `vue-movinglight.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    // Output directory for the build
    outDir: "../dist",
    emptyOutDir: true,
  },

  // Development server settings
  server: {
    port: 3000,
  },
});
