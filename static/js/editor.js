let editor;

/**
 * Initialise code editor;
 */
CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode:'text/html',
    lineNumbers: true,
    autofocus: true,
    lineWrapping: true,
    scrollbarStyle: null,
});

export default editor;