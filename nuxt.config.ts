// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-12-18",
  devtools: { enabled: true },

  // Enable SCSS preprocessor support
  css: [
    '@/assets/scss/main.scss' // global stylesheet
  ],

  vite: {
    plugins: [
      //...plugins,
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/variables.scss" as *;`
        }
      }
    },
  },

  experimental: { appManifest: false },
  modules: ["@nuxt/content", "nuxt-icon", "@nuxt/image", "@vueuse/nuxt", "@nuxtjs/tailwindcss"],

  runtimeConfig: {
    public: {
        wordpressUrl: 'https://vfit.theuselesspage.com/graphql'
    }
  },

  pages: true,

  // app: {
  //   head: {
  //     title: 'Nuxt WordPress',
  //     titleTemplate: '%s | Nuxt WordPress',
  //   },
  // },

  // $development: {
  //   app: {
  //     head: {
  //       title: 'DEV',
  //     },
  //   }
  // },

  // $production: {
  //   app: {
  //     head: {
  //       title: 'PROD',
  //       meta: [
  //         { name: 'robots', content: 'index, follow' },
  //         { name: 'googlebot', content: 'index, follow' },
  //         { name: 'bingbot', content: 'index, follow' }
  //       ]
  //     },
  //   }
  // },

  imports: {
    autoImport: true
  },


});
