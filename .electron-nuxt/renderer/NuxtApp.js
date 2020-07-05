import { join } from 'path'
import { fork } from 'child_process'
import { utils } from '@xpda-dev/core'
const { killWithAllSubProcess } = utils

const NUXT_PROCESS_PATH = join(__dirname, 'nuxt-process.js')

/**
 * @implements {IStep}
 */
class NuxtApp {
  constructor (logger) {
    this.logger = logger
  }

  async build (isDev) {
    this.nuxtProcess = fork(NUXT_PROCESS_PATH, { silent: true })
    this.redirectStdout()
    return new Promise((resolve, reject) => {
      this.nuxtProcess.send({ action: 'build', target: isDev ? 'development' : 'production' })
      this.nuxtProcess.once('message', ({ status, err }) => {
        if (status === 'ok') resolve()
        else reject(err)
      })
    })
  }

  redirectStdout () {
    this.nuxtProcess.stdout.pipe(this.logger.stdout)
    this.nuxtProcess.stderr.pipe(this.logger.stderr)
  }

  async terminate () {
    this.nuxtProcess.kill()
    if (this.nuxtProcess && !this.nuxtProcess.killed) killWithAllSubProcess(this.nuxtProcess.pid)
    this.nuxtProcess = null
  }
}

export default NuxtApp
