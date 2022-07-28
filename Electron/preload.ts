/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Electron from 'electron'

declare global {
  namespace NodeJS {
    interface Global {
      Electron: any
    }
  }
}

process.once('loaded', () => {
  global.Electron = Electron
})
