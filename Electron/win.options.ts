import { BrowserWindowConstructorOptions } from 'electron'
import { join } from 'path'

const { nativeImage } = require("electron");
const appIcon = nativeImage.createFromPath('./Electron/public/img/electronext.logo.png')

const winOptions:BrowserWindowConstructorOptions = {
  width: 800,
  height: 600,
  backgroundColor: "#111",
  frame: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    preload: join(__dirname, 'preload.js'),
  },
  icon: appIcon
}

export default winOptions