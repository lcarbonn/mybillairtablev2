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
    }
  }
})
