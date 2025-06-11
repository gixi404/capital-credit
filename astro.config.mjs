import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { DOMAIN_URL } from "./src/utils/const";

export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  integrations: [sitemap()],
  site: DOMAIN_URL,
  output: "server",
  adapter: vercel(),
  prefetch: true,
});
