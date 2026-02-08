import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      workbox: {
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "CacheFirst",
            options: {
              cacheName: "pages",
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          // {
          //   urlPattern: ({ request }) =>
          //     request.destination === "script" ||
          //     request.destination === "style" ||
          //     request.destination === "worker",
          //   handler: "StaleWhileRevalidate",
          //   options: {
          //     cacheName: "assets",
          //   },
          // },
          {
            urlPattern: ({ request }) =>
              request.url.includes("/data/") && request.url.endsWith(".json"),
            handler: "CacheFirst",
            options: {
              cacheName: "book-json",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      manifest: {
        name: "Pathways Reader",
        short_name: "DHOPR",
        description:
          "  Explore book series and stories designed to support early reading, curiosity, and confidence.",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/images/favicon/favicon-reader192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/favicon/favicon-reader512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
