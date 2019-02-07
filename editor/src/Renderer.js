const loader = require('monaco-loader');

$(document).ready(() => {
    loader().then((monaco) => {
        let editor = monaco.editor.create(document.getElementById('code-editor'), {
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true
        });
    });

    let gjseditor = grapesjs.init({
        container: '#grapejs-editor',
        components: '<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>\n<script src="https://cdn.metroui.org.ua/v4/js/metro.min.js"></script>',
        fromElement: true,
        // Size of the editor
        height: '500px',
        width: 'auto',
        // Disable the storage manager for the moment
        storageManager: { type: null },
        layerManager: {
            appendTo: '.layers-container'
        },
        // Avoid any default panel
        panels: {
            defaults: [
                {
                    id: 'panel-switcher',
                    el: '.panel__switcher',
                    buttons: [{
                        id: 'show-layers',
                        active: true,
                        label: 'Layers',
                        command: 'show-layers',
                        // Once activated disable the possibility to turn it off
                        togglable: false,
                    }, {
                        id: 'show-style',
                        active: true,
                        label: 'Styles',
                        command: 'show-styles',
                        togglable: false,
                    }],
                },
                {
                    id: 'layers',
                    el: '.panel__right',
                    // Make the panel resizable
                    resizable: {
                        maxDim: 350,
                        minDim: 200,
                        tc: 0, // Top handler
                        cl: 1, // Left handler
                        cr: 0, // Right handler
                        bc: 0, // Bottom handler
                        // Being a flex child we need to change `flex-basis` property
                        // instead of the `width` (default)
                        keyWidth: 'flex-basis',
                    },
                }
            ]
        },
        selectorManager: {
            appendTo: '.styles-container'
        },
        styleManager: {
            appendTo: '.styles-container',
            sectors: [{
                name: 'Dimension',
                open: false,
                // Use built-in properties
                buildProps: ['width', 'min-height', 'padding'],
                // Use `properties` to define/override single property
                properties: [
                    {
                        // Type of the input,
                        // options: integer | radio | select | color | slider | file | composite | stack
                        type: 'integer',
                        name: 'The width', // Label for the property
                        property: 'width', // CSS property (if buildProps contains it will be extended)
                        units: ['px', '%'], // Units, available only for 'integer' types
                        defaults: 'auto', // Default value
                        min: 0, // Min value, available only for 'integer' types
                    }
                ]
            },{
                name: 'Extra',
                open: false,
                buildProps: ['background-color', 'box-shadow', 'custom-prop'],
                properties: [
                    {
                        id: 'custom-prop',
                        name: 'Custom Label',
                        property: 'font-size',
                        type: 'select',
                        defaults: '32px',
                        // List of options, available only for 'select' and 'radio'  types
                        options: [
                            { value: '12px', name: 'Tiny' },
                            { value: '18px', name: 'Medium' },
                            { value: '32px', name: 'Big' },
                        ],
                    }
                ]
            }]
        },
        blockManager: {
            appendTo: '#blocks',
            blocks: [
                {
                    id: 'button', // id is mandatory
                    label: '<span class="mif-home">Button</span>', // You can use HTML/SVG inside labels
                    attributes: { class:'button' },
                    content: `<button class="button">Button</button>`,
                }
            ]
        },
    });

    gjseditor.BlockManager.add('switch', {
        label: `<span>Switch</span>`,
        category: '',
        attributes: {},
        content: `<input type="checkbox" data-role="switch" data-caption="Switch"/>`
    });

    gjseditor.BlockManager.add('input', {
        label: `<span>TextField</span>`,
        category: '',
        attributes: {},
        content: `<input type="text" data-role="input">`,
    });

    gjseditor.BlockManager.add('textarea', {
        label: `<span>TextArea</span>`,
        category: '',
        attributes: {},
        content: `<textarea data-role="textarea"></textarea>`,
    });

    gjseditor.Panels.addPanel({
        id: 'panel-top',
        el: '.panel__top',
    });
    gjseditor.Panels.addPanel({
        id: 'basic-actions',
        el: '.panel__basic-actions',
        buttons: [
            {
                id: 'visibility',
                active: true, // active by default
                className: 'btn-toggle-borders',
                label: '<u>B</u>',
                command: 'sw-visibility', // Built-in command
            }, {
                id: 'export',
                className: 'btn-open-export',
                label: 'Exp',
                command: 'export-template',
                context: 'export-template', // For grouping context of buttons from the same panel
            }, {
                id: 'show-json',
                className: 'btn-show-json',
                label: 'JSON',
                context: 'show-json',
                command(editor) {
                    editor.Modal.setTitle('Components JSON')
                        .setContent(`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`)
                        .open();
                },
            }
        ],
    });

    // Define commands
    gjseditor.Commands.add('show-layers', {
        getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
        getLayersEl(row) { return row.querySelector('.layers-container') },

        run(editor, sender) {
            const lmEl = this.getLayersEl(this.getRowEl(editor));
            lmEl.style.display = '';
        },
        stop(editor, sender) {
            const lmEl = this.getLayersEl(this.getRowEl(editor));
            lmEl.style.display = 'none';
        },
    });
    gjseditor.Commands.add('show-styles', {
        getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
        getStyleEl(row) { return row.querySelector('.styles-container') },

        run(editor, sender) {
            const smEl = this.getStyleEl(this.getRowEl(editor));
            smEl.style.display = '';
        },
        stop(editor, sender) {
            const smEl = this.getStyleEl(this.getRowEl(editor));
            smEl.style.display = 'none';
        },
    });

    $('#file-tab').click(() => {
        $('#gjs-editor').hide();
        $('#file-viewer').hide();
        $('#code-editor').hide();
    });

    $('#edit-tab').click(() => {
        $('#gjs-editor').hide();
        $('#file-viewer').show();
        $('#code-editor').show();
    });

    $('#designer-tab').click(() => {
        $('#gjs-editor').show();
        $('#file-viewer').hide();
        $('#code-editor').hide();
    });

    $('#group-tab').click(() => {
        $('#gjs-editor').hide();
        $('#file-viewer').hide();
        $('#code-editor').hide();
    });

    $('#gjs-editor').hide();
    $('#file-viewer').hide();
    $('#code-editor').hide();
});