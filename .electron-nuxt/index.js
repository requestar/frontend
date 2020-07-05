
import { join } from 'path'
import { DefinePlugin } from 'webpack'
import electron from 'electron'

import { Pipeline, Logger } from '@xpda-dev/core'
import { ElectronLauncher } from '@xpda-dev/electron-launcher'
import { ElectronBuilder } from '@xpda-dev/electron-builder'
import { Webpack } from '@xpda-dev/webpack-step'
import { mainProcess } from './resources-path-provider'
import { DIST_DIR, MAIN_PROCESS_DIR, SERVER_HOST, SERVER_PORT } from './config'
import NuxtApp from './renderer/NuxtApp'

const isDev = process.env.NODE_ENV === 'development'

const launcher = new ElectronLauncher({
  electronPath: electron,
  entryFile: join(DIST_DIR, 'main/index.js')
})

function hasConfigArgument (array) {
  for (const el of array) if (el === '--config' || el === '-c') return true
  return false
}
const argumentsArray = process.argv.slice(2)
if (!hasConfigArgument(argumentsArray)) argumentsArray.push('--config', 'builder.config.js')

const builder = new ElectronBuilder({
  processArgv: argumentsArray
})

const webpackConfig = Webpack.getBaseConfig({
  entry: isDev
    ? join(MAIN_PROCESS_DIR, 'index.dev.js')
    : join(MAIN_PROCESS_DIR, 'index.js'),
  output: {
    filename: 'index.js',
    path: join(DIST_DIR, 'main')
  },
  plugins: [
    new DefinePlugin({
      INCLUDE_RESOURCES_PATH: mainProcess(),
      'process.env.DEV_SERVER_URL': `'${SERVER_HOST}:${SERVER_PORT}'`
    })
  ]
})

const webpackMain = new Webpack({
  logger: new Logger('Main', 'olive'),
  webpackConfig,
  launcher // need to restart launcher after compilation
})

const nuxt = new NuxtApp(new Logger('Nuxt', 'green'))

const pipe = new Pipeline({
  title: 'Electron-nuxt',
  isDevelopment: isDev,
  steps: [webpackMain, nuxt],
  launcher,
  builder
})

pipe.run()
