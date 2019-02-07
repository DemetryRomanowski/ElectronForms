const fs = require('fs');

class Window {
    constructor(){
        this.elements = [];
    }

    pushElement(element){
        this.elements.push(element);
    }

    render(){
        let html =
            "<html>" +
            "   <head>" +
            //"       <script src=\"http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>"+
            "       <script type='text/javascript'>const ipcRenderer = require('electron').ipcRenderer;</script>" +
            "       <!-- Required meta tags -->" +
            "       <meta charset=\"utf-8\">" +
            "       <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">" +
            "       <!-- Metro 4 -->" +
            "       <link rel=\"stylesheet\" href=\"./libs/metro.css\">" +
            "       <style>body{ background-color:#fafafa; }</style>" +
            "       <!-- jQuery first, then Metro UI JS - JQUERY WORK AROUND FOR ELECTRON-->" +
            "       <script>window.$ = window.jQuery = require('./libs/jquery-3.3.1.min.js');</script>" +
            "       <script src='./libs/metro.js'></script>" +
            "   </head>";
            "   <body>";

        for(let i = 0; i < this.elements.length; i++)
        {
            html += this.elements[i].render();
        }

        html +=
            "</body>" +
            "</html>";

        return html;
    }

    /**
     * Compile the window
     * @param compile_loc The compile location as String
     * @param cb The callback once complete, because NodeJS
     */
    compile(compile_loc, cb){
        let html = this.render();

        fs.writeFile(compile_loc, html, function(err, data){
            if (err) console.log(err);
            // console.log("Successfully Compiled.");
            cb();
        });
    }
}

module.exports = Window;