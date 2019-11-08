import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '행운5',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || 'nuxt & koa & typescript' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },

    /*
     ** Global CSS
     */
    css: [
        'element-ui/lib/theme-chalk/reset.css',
        'element-ui/lib/theme-chalk/index.css',
        '@/assets/css/main.css'
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '@/plugins/element-ui',
        '~/plugins/axios'
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios'
    ],
    /*
     ** Axios module configuration
     */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
    },
    serverMiddleware: [
        // { path: '/api', handler: '~/api/middleWare.ts' },
        // { path: '/api', handler: '~/api/index.ts' },
    ],

    /*
     ** Build configuration
     */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config: any, ctx: any) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        },
        cache: false
    }
}

export default config
