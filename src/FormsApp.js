const { app, BrowserWindow } = require('electron');
const { Window, Button, Checkbox, Input, Switch } = require('./Forms/Forms');

class FormsApp {
    constructor() {
        this.win = {};

        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        app.on('ready', FormsApp.createWindow);

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
            if (win === null) {
                FormsApp.createWindow();
            }
        });
    }

    static createWindow(window) {
        win = new BrowserWindow({
            width: 800, height: 600
        });

        window.compile('./build/compiled.html', () => {
            // Load the compiled window html
            win.loadFile('./build/compiled.html');

            // Emitted when the window is closed.
            win.on('closed', () => {
                // Dereference the window object, usually you would store windows
                // in an array if your app supports multi windows, this is the time
                // when you should delete the corresponding element.
                win = null
            });
        });
    }
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600 });

    let window = new Window();

    let input_one = new Input(0, 0, 200, 50, "input_one");
    let input_two = new Input(0, 60, 200, 50, "input_two");
    let swit = new Switch(100, 250);
    let check = new Checkbox("Checkbox", 100, 200);

    swit.checkChanged = function(val, l) {
        console.log(l);
    };

    check.checkChanged = function(val, l) {
        console.log(l);
    };

    let calc_button = new Button("Calculate", 0, 120, 200, 50, "calc_button");

    calc_button.onClick = function() {
        let x = Number.parseInt(input_one.text);
        let y = Number.parseInt(input_two.text);

        console.log(x + y);
    };

    window.pushElement(swit);
    window.pushElement(input_one);
    window.pushElement(input_two);
    window.pushElement(calc_button);
    window.pushElement(check);


}

