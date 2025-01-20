import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const baseConfig = {
    plugins: [vue()],
    build: {
      target: ["es2018", "chrome70", "edge79", "firefox68", "safari13.1"],
      polyfillModulePreload: true,
      cssCodeSplit: false, // Prevent CSS code splitting
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
        },
      },
    },
  };

  if (command === "serve") {
    return {
      ...baseConfig,
      root: "./examples",
      server: {
        port: 3000,
      },
    };
  }

  const isBuildingLib = process.env.BUILD_MODE === "lib";

  if (isBuildingLib) {
    return {
      ...baseConfig,
      build: {
        ...baseConfig.build,
        lib: {
          entry: resolve(__dirname, "src/index.ts"),
          name: "VueMovingLight",
          fileName: (format) =>
            `vue-movinglight.${format === "umd" ? "umd" : "es"}.js`,
        },
        rollupOptions: {
          external: ["vue"],
          output: {
            globals: {
              vue: "Vue",
            },
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === "style.css") return "style.css";
              return assetInfo.name;
            },
          },
        },
        outDir: "dist",
        emptyOutDir: true,
      },
    };
  }

  return {
    ...baseConfig,
    root: "./examples",
    build: {
      ...baseConfig.build,
      outDir: "../dist-demo",
      emptyOutDir: true,
    },
  };
});
