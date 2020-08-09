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
	{ ssr: true, src: '@/plugins/icons.js' }
]
export const buildModules = ['@nuxtjs/vuetify']
export const modules = []
export const devtools = true;
