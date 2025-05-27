import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import { DOMAIN } from "./src/utils/const";

export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  integrations: [sitemap()],
  site: DOMAIN,
  devToolbar: { enabled: false },
  output: "server",
  adapter: vercel(),
});
