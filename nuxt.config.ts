// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app:{
    head: {
      title: 'My Bill Airtable',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'My Bill Airtable' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
  },
  modules: [
    '@bootstrap-vue-next/nuxt',
    'unplugin-icons/nuxt',
    '@vite-pwa/nuxt'
  ],
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '~/assets/css/custom-theme.scss'
  ],
  pwa: {
    /* PWA options */
    manifest: {
      name: 'My Bill Airtable',
      short_name: 'mybillairtable',
      display: 'standalone',
      description: 'My Bill on Airtable',
      lang: 'fr-FR'
    },
  },
  runtimeConfig: {
    FIREBASE_API_KEY: process.env.NUXT_FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.NUXT_FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.NUXT_FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
    AIRTABLE_API_KEY: process.env.NUXT_AIRTABLE_API_KEY,
    AIRTABLE_BASE_NAME: process.env.NUXT_AIRTABLE_BASE_NAME,
    AIRTABLE_BASE_ID: process.env.NUXT_AIRTABLE_BASE_ID,
    AIRTABLE_FACTURE: process.env.NUXT_AIRTABLE_FACTURE,
    AIRTABLE_LIGNE_FACTURE: process.env.NUXT_AIRTABLE_LIGNE_FACTURE,
    AIRTABLE_CLIENT: process.env.NUXT_AIRTABLE_CLIENT,
    AIRTABLE_CA: process.env.NUXT_AIRTABLE_CA,
            
    public: {
      FIREBASE_API_KEY: process.env.NUXT_FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.NUXT_FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.NUXT_FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
      AIRTABLE_API_KEY: process.env.NUXT_AIRTABLE_API_KEY,
      AIRTABLE_BASE_NAME: process.env.NUXT_AIRTABLE_BASE_NAME,
      AIRTABLE_BASE_ID: process.env.NUXT_AIRTABLE_BASE_ID,
      AIRTABLE_FACTURE: process.env.NUXT_AIRTABLE_FACTURE,
      AIRTABLE_LIGNE_FACTURE: process.env.NUXT_AIRTABLE_LIGNE_FACTURE,
      AIRTABLE_CLIENT: process.env.NUXT_AIRTABLE_CLIENT,
      AIRTABLE_CA: process.env.NUXT_AIRTABLE_CA,
 
    }
  }  
})
