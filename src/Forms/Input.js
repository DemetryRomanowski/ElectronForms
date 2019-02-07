const Base = require('./WindowItem');
const ipcMain = require('electron').ipcMain;

class Input extends Base
{
    constructor(x, y, width = 200, height = 50, name = "Input"){
        super();
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = "";

        ipcMain.on(`${this.name}_keyup`, (event, arg) => {
            this.text = arg;

            try {
                this.keyUp(this, arg);
            }catch(e){}

            event.sender.send(`${this.name}_keyup-task-finished`, "yes");

        });
    }

    render() {
        return (`<input id="${this.name}" style="position: fixed; top: ${this.y}px; left: ${this.x}px; width: ${this.width}px; height: ${this.height}px;" type="text" data-role="input"><script type="text/javascript"> $("#${this.name}").keyup(function(){ipcRenderer.send('${this.name}_keyup', $(this).val());});</script>`);
    }
}

module.exports = Input;