import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  // 개발 모드일 때의 설정
  root: "./examples", // examples 디렉토리를 루트로 설정

  // 빌드 설정 (라이브러리 모드)
  build: {
    // 라이브러리 빌드시의 설정
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
    // 빌드 출력 디렉토리
    outDir: "../dist",
    emptyOutDir: true,
  },

  // 개발 서버 설정
  server: {
    port: 3000,
  },
});
