const { app, BrowserWindow } = require('electron');
const { Window, Button, Checkbox, Input, Switch } = require('./Forms/Forms');

class FormsApp {
    constructor(window) {
        this.win = {};
        FormsApp.window = window;
    }

    init() {
        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        app.on('ready', this.createWindow);

        // Quit when all windows are closed.
        app.on('window-all-closed', () => {
            // On macOS it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin') {
                app.quit()
            }
        });

        app.on('activate', () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (this.win === null) {
                this.createWindow();
            }
        });
    }

    createWindow() {
        this.win = new BrowserWindow({
            width: 800, height: 600
        });

        FormsApp.window.compile('./build/compiled.html', () => {
            // Load the compiled window html
            this.win.loadFile('./build/compiled.html');

            // Emitted when the window is closed.
            this.win.on('closed', () => {
                // Dereference the window object, usually you would store windows
                // in an array if your app supports multi windows, this is the time
                // when you should delete the corresponding element.
                this.win = null
            });
        });
    }
}

module.exports = FormsApp;

