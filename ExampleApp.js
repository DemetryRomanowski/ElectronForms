const FormsApp = require('./src/FormsApp');
const { Window, Button, Checkbox, Input, Switch } = require('./src/Forms/Forms');

//Main entry point
function main() {
    //Initialize the FormsApp and windows
    let window = new Window();
    let formsapp = new FormsApp(window);

    formsapp.init();

    //Create objects for inputs sswitches and checks
    let input_one = new Input(0, 0, 200, 50, "input_one");
    let input_two = new Input(0, 60, 200, 50, "input_two");
    let swit = new Switch(100, 250);
    let check = new Checkbox("Checkbox", 100, 200);

    //Handle switch changed event (NOTE: Not working correctly yet)
    swit.checkChanged = function (val, l) {
        console.log(l);
    };

    //Handle checkbox changed event
    check.checkChanged = function (val, l) {
        console.log(l);
    };

    //Create a button
    let calc_button = new Button("Calculate", 0, 120, 200, 50, "calc_button");

    //Handle a click event
    calc_button.onClick = function () {
        let x = Number.parseInt(input_one.text);
        let y = Number.parseInt(input_two.text);

        console.log(x + y);
    };

    /**
     * Push all the elements you created to the window
     */
    window.pushElement(swit);
    window.pushElement(input_one);
    window.pushElement(input_two);
    window.pushElement(calc_button);
    window.pushElement(check);
}

main(); //Call the main entrypoint