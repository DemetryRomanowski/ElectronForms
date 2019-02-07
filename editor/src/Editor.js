import interact from 'interactjs'
import jquery from 'jquery';

class Editor {
    constructor() {

        this.pos = {};

        interact('.tool-box-item').draggable({
            onend(ev) {
                this.pos.x = event.pageX;
                this.pos.y = event.pageY;
            }
        });
    }
}