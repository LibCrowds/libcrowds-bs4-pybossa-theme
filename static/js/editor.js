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
    var code = $(this).html(),
        opts = $(this).data();
    
    opts.value = code;
    $(this).empty();

    CodeMirror(this, opts);
});