/**
 * Return true if the row contains all search terms, false otherwise.
 */
function searchRow(row, words) {
    for (var i = 0; i < words.length; i++) {
        if (row.text().toLowerCase().indexOf(words[i]) === -1) {
            return false;
        }
    }
    return true;
}

// Handle change or keyup event for table search box.
$('.search-table[data-target]').on('change keyup', function(evt) {
    console.log(evt.target.value)
    var tableId = $(this).data('target'),
        text    = evt.target.value.toLowerCase(),
        words   = text.split(' ');

    $(tableId).find('tbody tr:not(.no-data)').each(function() {
        if (searchRow($(this), words)) {
            $(this).removeClass('hidden');
        } else {
            $(this).addClass('hidden');
        }
    });
});