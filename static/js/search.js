$('.search-table[data-target]').on('keyup', function(evt) {
    const tableId    = $(this).data('target'),
          searchText = evt.target.value.toLowerCase();
          searchWords = searchText.split(' ');

        $(tableId).find('tbody tr:not(.no-data)').each(function() {
            checkRow($(this), searchWords);
        });
});

/**
 * Hide a row if it doesn't contain all search words.
 */
function checkRow(row, searchWords) {
    for (let word of searchWords) {
        if (row.text().toLowerCase().indexOf(word) === -1) {
            row.addClass('hidden');
            return;
        }
    }
    row.removeClass('hidden');
}