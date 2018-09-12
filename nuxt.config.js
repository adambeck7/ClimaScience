module.exports = {
  /*
  ** Headers of the page
  */ env: {
    GEOCODE_API_KEY: 'AIzaSyBgPq_-8pPHqIlL9YaQCl8qLHcCr9jE-A8'
  },
  head: {
    title: 'ClimaScience',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
        body: true
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js',
        body: true
      },
      {
        src:
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyDnDVcOKz9T8y1QE9V11gUu0G2EWwGBDQo',
        body: true
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/min/custom-min.css',
    '~/assets/min/plugin-min.css',
    '~/assets/css/font-awesome.min.css',
    '~/assets/css/materialize.min.css',
    '~/assets/css/weather-icons-wind.css',
    '~/assets/css/weather-icons-wind.min.css',
    '~/assets/css/weather-icons.css',
    '~/assets/css/weather-icons.min.css'
  ],

  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ]
}
