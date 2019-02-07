const Base = require("./WindowItem");
const ipcMain = require('electron').ipcMain;

class Checkbox extends Base {
    constructor(contents, x, y, name = "Checkbox"){
        super();

        this.name = name;
        this.contents = contents;
        this.x = x;
        this.y = y;
        this.checked = false;
        this.disabled = false;
        this.role = "checkbox";

        //Update the checked value for the checkbox
        ipcMain.on(`${this.name}_click`, (event, arg) => {
            this.checked = arg;

            try{
                this.checkChanged(this, arg);
            }catch(e){}

            event.sender.send(`${this.name}_click-task-finished`, "yes");
        });
    }

    render(){
        //THIS WAS A BITCH TO WRITE
        return (`<input id="${this.name}" type="checkbox" data-role="${this.role}" data-style="2" data-caption="${this.contents}" style="position:fixed; left:${this.x}px; top:${this.y}px;"><script type="text/javascript">var label = $(\'.${this.role}'); label.css("position", "fixed"); label.css("top", "${this.y}px"); label.css("left", "${this.x}px"); var checkbox = document.getElementById('${this.name}'); checkbox.addEventListener('click', function () {ipcRenderer.send('${this.name}_click', checkbox.checked);});</script>`);
    }

    toString() {
        return super.toString();
    }
}

module.exports = Checkbox;