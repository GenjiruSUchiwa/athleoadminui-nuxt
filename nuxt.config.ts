// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt',
        ['@vee-validate/nuxt', {
            autoImports: true,
        }
        ]
    ],
    extends: [
        './apps/authentication'
    ],
    runtimeConfig: {
        // Private keys are only available on the server
        apiSecret: '123',

        // Public keys that are exposed to the client
        public: {
            apiBase: process.env.BASE_API_URL
        }
    }
})
