// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },
  // Enable SCSS preprocessor support
  css: [
    '@/assets/scss/main.scss' // global stylesheet
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/variables.scss" as *;`
        }
      }
    }
  },
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },
  experimental: { appManifest: false },
  modules: ["@nuxt/content", "nuxt-icon", "@nuxt/image"],
  compatibilityDate: "2024-12-18",
});
