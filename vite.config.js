import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@contexts": fileURLToPath(new URL("./src/contexts", import.meta.url)),
      "@controls": fileURLToPath(
        new URL("./src/components/controls", import.meta.url)
      ),
      "@skeletons": fileURLToPath(
        new URL("./src/components/utils/skeletons", import.meta.url)
      ),
      "@utils": fileURLToPath(
        new URL("./src/components/utils", import.meta.url)
      ),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000/api/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
