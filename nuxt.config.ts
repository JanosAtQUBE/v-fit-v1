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
  modules: ["@nuxt/content", "nuxt-icon", "@nuxt/image", "@vueuse/nuxt"],

  runtimeConfig: {
    public: {
        wordpressUrl: 'https://vfit-nuxt.local/graphql'
    }
  },

  pages: true,

  app: {
    head: {
      title: 'Nuxt WordPress',
      titleTemplate: '%s | Nuxt WordPress',
    },
  },

  $development: {
    app: {
      head: {
        title: 'DEV',
      },
    }
  },

  $production: {
    app: {
      head: {
        title: 'PROD',
        meta: [
          { name: 'robots', content: 'index, follow' },
          { name: 'googlebot', content: 'index, follow' },
          { name: 'bingbot', content: 'index, follow' }
        ]
      },
    }
  },

  imports: {
    autoImport: true
  },

  compatibilityDate: "2024-12-18",
});
