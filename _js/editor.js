import CodeMirror from 'codemirror';
import javascript from 'codemirror/mode/javascript/javascript';
import xml from 'codemirror/mode/xml/xml';
import css from 'codemirror/mode/css/css';
import http from 'codemirror/mode/http/http';
import htmlmixed from 'codemirror/mode/htmlmixed/htmlmixed';

let editor;

/**
 * Initialise code editor for text areas.
 */
if ($('#editor').length) {
    CodeMirror.fromTextArea(document.getElementById('editor'), {
        mode:'text/html',
        lineNumbers: true,
        autofocus: true,
        lineWrapping: true,
        scrollbarStyle: null,
    });
 }

/**
 * Initialise code editor for code blocks.
 */
 $('code').each(function() {
    var code = $(this).text(),
        opts = $(this).data();
    
    // Trim leading whitespace
    code = code.replace(new RegExp(code.match(/\s*\n[\t\s]*/), "g"),'\n')
    
    opts.value = code;
    $(this).empty();

    CodeMirror(this, opts);
});

export default editor;