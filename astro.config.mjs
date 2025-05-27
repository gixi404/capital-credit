import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  integrations: [sitemap()],
  site: "https://c173f308-e60b-4dd0-b533-62b33cce9b19.vercel.app",
  devToolbar: { enabled: false },
  output: "server",
  adapter: vercel(),
});
