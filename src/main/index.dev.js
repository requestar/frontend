import fs from 'fs'
import path from 'path'
import { Menu, MenuItem, app } from 'electron'
import electronDebug from 'electron-debug'
// import vueDevtools from 'vue-devtools'
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { ELECTRON_RELAUNCH_CODE } from '../../.electron-nuxt/config'
import mainWinHandler from './mainWindow'
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

electronDebug({
	showDevTools: false,
	devToolsMode: 'right'
})

// work around https://github.com/MarshallOfSound/electron-devtools-installer/issues/122
// which seems to be a result of https://github.com/electron/electron/issues/19468
if (process.platform === 'win32') {
	const appUserDataPath = app.getPath('userData')
	const devToolsExtensionsPath = path.join(appUserDataPath, 'DevTools Extensions')
	try {
		fs.unlinkSync(devToolsExtensionsPath)
	} catch (_) {
		// don't complain if the file doesn't exist
	}
}

app.on('ready', () => {
	const menu = Menu.getApplicationMenu()
	const refreshButton = new MenuItem({
		label: 'Relaunch electron',
		accelerator: 'CommandOrControl+E',
		click: () => {
			app.exit(ELECTRON_RELAUNCH_CODE)
		}
	})
	menu.append(refreshButton)
	Menu.setApplicationMenu(menu)
})

mainWinHandler.onCreated(browserWindow => {
	if (process.env.NODE_ENV === 'development') {
		// Open the DevTools.
		installExtension(VUEJS_DEVTOOLS)
			.then(name => {
				console.log(`Added Extension:  ${name}`);
				browserWindow.webContents.openDevTools("bottom");
			})
			.catch(err => console.log("An error occurred: ", err));

		browserWindow.loadURL('http://localhost:9080');
		return browserWindow;
	}
})

// Require `main` process to boot app
require('./index')
