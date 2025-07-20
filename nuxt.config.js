// nuxt.config.js
export default {
  head: {
    title: 'Auth Fire Nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  target: 'static',
  ssr: true,
  plugins: [
    '~/plugins/bootstrap-vue.js',
    '~/plugins/vuelidate.js',
    { src: '~/plugins/clearLogoutTimer.js', mode: 'client' }
  ],
  buildModules: [
    '@nuxtjs/dotenv',
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  build: {
    dir: 'dist'
  },
}