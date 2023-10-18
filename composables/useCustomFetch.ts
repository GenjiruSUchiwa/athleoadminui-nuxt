import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'

export function useCustomFetch<T> (url: string, options: UseFetchOptions<T> = {}) {
    const userAuth = useCookie('auth.user')
    console.log(userAuth)
    const config = useRuntimeConfig()

    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.apiBase ?? 'https://api.nuxtjs.dev',
        // this overrides the default key generation, which includes a hash of
        // url, method, headers, etc. - this should be used with care as the key
        // is how Nuxt decides how responses should be deduplicated between
        // client and server
        key: url,

        // set user token if connected
        headers: userAuth.value
            ? { Authorization: `Bearer ${userAuth.value.token}`, 'Content-type': 'application/json' }
            : {'Content-type': 'application/json'},

        onResponse (_ctx) {
            // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
        },

        onResponseError (_ctx) {
            const error  = _ctx.response._data
            throw new Error(error.data)
        }
    }

    // for nice deep defaults, please use unjs/defu
    const params = defu(options, defaults)

    return useFetch(url, params)
}
