// Native
import { join } from 'path'
import { format } from 'url'

//Electron
import { app, ipcMain, IpcMainEvent, shell } from 'electron'
//BrowserWindow Options
import winOptions from './win.options'

// Packages
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'

//const { BrowserWindow: BrowserWindowVibrancy } = require("electron-acrylic-window");
const { BrowserWindow } = require("electron");

//@Initializing App
//app.commandLine.appendSwitch("enable-transparent-visuals");
// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./Next')

  //BrowserWindow
  const win = new BrowserWindow({...winOptions})

  // Open links in browser
	win.webContents.setWindowOpenHandler((details: { url: string }) => {
		shell.openExternal(details.url)
		return { action: 'deny' }
	})

  // open app
  const url = isDev
  ? 'http://localhost:8000/'
  : format({
      pathname: join(__dirname, '../../Next/out/index.html'),
      protocol: 'file:',
      slashes: true,
    })
    win.loadURL(url)



  //WINDOW CONTROLS
    //@warn Maximize
    ipcMain.on('MaximizeApp', () => {
      if (win.isMaximized()) {
        win.unmaximize()
      } else {
        win.maximize()
      }
    })
    //@warn Minimize
    ipcMain.on('MinimizeApp', () => {
      win.minimize()
    })
    //@warn Close
    ipcMain.on('CloseApp', () => {
      win.close()
    })
})




// Quit the app once all windows are closed
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message)
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500)
})

