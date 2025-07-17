// nuxt.config.js
export default {
  ssr: false, // This is the new way to set SPA mode in Nuxt 2.15+

  head: {
    title: 'Auth App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: ['bootstrap/dist/css/bootstrap.css'],

  plugins: [
    '~/plugins/firebase.js',
    { src: '~/plugins/auth.js', mode: 'client' },
    { src: '~/plugins/clearLogoutTimer.js', mode: 'client' },
    { src: '~/plugins/bootstrap-vue.js', mode: 'client' },
     { src: '~/plugins/vuelidate.js', mode: 'client' }
  ],

  components: true,

  buildModules: [],

  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt'
  ],

  bootstrapVue: {
    icons: true
  },

  axios: {
    baseURL: '/'
  },

  build: {},
  

  router: {
    middleware: ['auth']
  },
   routes: './routes.js',
}