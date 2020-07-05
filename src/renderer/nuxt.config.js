/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */

export const mode = 'spa'
export const head = {
    title: 'frontend'
}
export const loading = false
export const plugins = [
    { ssr: true, src: '@/plugins/icons.js' },
    { ssr: true, src: '@/plugins/buefy.js' }
]
export const buildModules = []
export const modules = []
