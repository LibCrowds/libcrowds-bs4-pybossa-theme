let forms;

/**
 * Make a slug from a long name.
 */
function makeSlug(text) {
    var invalid_chars = /([$#%·~!¡?"¿'=)(!&\/|]+)/g;
    return text.toLowerCase().trim().replace(invalid_chars, "").replace(/( )+/g, "");
}

if (location.pathname.split('/')[1] === 'project') {
    $("#name").on('keyup', function () {
        $('#short_name').val(makeSlug($(this).val()));
    });
}

if (location.pathname.split('/')[1] === 'account') {
    $("#fullname").on('keyup', function () {
        $('#name').val(makeSlug($(this).val()));
    });
}

export default forms;