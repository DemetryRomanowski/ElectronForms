const Checkbox = require('./Checkbox');

class Switch extends Checkbox {
    constructor(x, y, name = "Switch"){
        super(null, x, y, name);
        super.role = "switch";
    }
}

module.exports = Switch;