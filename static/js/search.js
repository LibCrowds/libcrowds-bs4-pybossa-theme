$('.search-table[data-target]').on('keyup', function(evt) {
    var tableId = $(this).data('target'),
        text    = evt.target.value.toLowerCase(),
        words   = text.split(' ');

        $(tableId).find('tbody tr:not(.no-data)').each(function() {
            checkRow($(this), words);
        });
});

/**
 * Hide a row if it doesn't contain all search words.
 */
function checkRow(row, words) {
    for (var i = 0; i < words.length; i++) {
        if (row.text().toLowerCase().indexOf(words[i]) === -1) {
            row.addClass('hidden');
            return;
        }
    }
    row.removeClass('hidden');
}