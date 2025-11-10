// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
<<<<<<< HEAD
    'motion-v/nuxt',
    '@unocss/nuxt',
=======
    'motion-v/nuxt'
>>>>>>> parent of 7cc8244 (fix theme icon issue)
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

<<<<<<< HEAD
  compatibilityDate: '2024-11-01',
=======
  compatibilityDate: '2025-11-10',
>>>>>>> parent of 7cc8244 (fix theme icon issue)

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
