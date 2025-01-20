import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig(({ command }) => {
  const baseConfig = {
    plugins: [
      vue(),
      dts({
        include: ["src/**/*.ts", "src/**/*.vue"],
        exclude: ["src/**/*.spec.ts", "src/**/*.test.ts"],
        tsconfigPath: "./tsconfig.json",
        outDir: "dist/types",
        staticImport: true,
        insertTypesEntry: true,
        rollupTypes: true,
        cleanVueFileName: true,
        afterBuild: () => {
          console.log("✓ Type declarations generated successfully");
        },
      }),
    ],
    test: {
      environment: "jsdom",
      globals: true,
      root: "./",
      include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        include: ["src/**/*.{vue}"],
        exclude: [
          "examples/**",
          "node_modules/**",
          "dist/**",
          "**/*.d.ts",
          "**/*.test.ts",
          "**/*.spec.ts",
        ],
      },
    },
    build: {
      target: ["es2018", "chrome70", "edge79", "firefox68", "safari13.1"],
      modulePreload: { polyfill: true },
      cssCodeSplit: true,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === "production",
          drop_debugger: true,
        },
      },
      sourcemap: true,
    },
  };

  if (command === "serve") {
    return {
      ...baseConfig,
      root: "./examples",
      server: {
        port: 3000,
        host: true,
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
            `vue-movinglight.${format === "umd" ? "umd" : "esm"}.js`,
        },
        rollupOptions: {
          external: ["vue"],
          output: {
            exports: "named",
            globals: {
              vue: "Vue",
            },
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === "index.css") {
                return "style.css";
              }
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
