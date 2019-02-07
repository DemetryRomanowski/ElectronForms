const Base = require('./WindowItem');
const ipcMain = require('electron').ipcMain;

class Button extends Base {
    constructor(contents, x, y, width = 200, height = 50, name = "Button") {
        super();
        this.name = name;
        this.contents = contents;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        //Add the event handler for clicks
        ipcMain.on(`${this.name}_click`, (event, arg) => {
            try {
                this.onClick(arg);
            } catch (e) {}

            event.sender.send(`${this.name}_click-task-finished`, "yes");
        });
    }

    render(){
        return (`<button id="${this.name}" style="position:fixed; left:${this.x}px; top:${this.y}px; width:${this.width}px; height:${this.height}px" class="button">${this.contents}</button><script type="text/javascript">document.getElementById('${this.name}').addEventListener('click', function () {ipcRenderer.send('${this.name}_click');});</script>`);
    }

    toString() {
        return super.toString();
    }
}

module.exports = Button;