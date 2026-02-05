import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Genius Lyrics Card Maker",
        short_name: "Lyrics Cards",
        lang: "en-US",
        description:
          "Search for any song and create a personalized Genius lyrics cards to share with your friends.",
        icons: [
          {
            src: "/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        theme_color: "#f7f16c",
        background_color: "#272838",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
      },
      workbox: {
        skipWaiting: true,
      },
    }),
    sentryVitePlugin({
      org: "genius-fp",
      project: "legacy-react-genius",
    }),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url),
      ),
      "@contexts": fileURLToPath(new URL("./src/contexts", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@controls": fileURLToPath(
        new URL("./src/components/controls", import.meta.url),
      ),
      "@skeletons": fileURLToPath(
        new URL("./src/components/utils/skeletons", import.meta.url),
      ),
      "@compUtils": fileURLToPath(
        new URL("./src/components/utils", import.meta.url),
      ),
    },
  },

  server: {
    proxy: {
      "/api": {
        target: "https://genius-unofficial-api.vercel.app/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  build: {
    sourcemap: true,
  },
});
