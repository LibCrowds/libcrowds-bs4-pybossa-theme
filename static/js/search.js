$('.search-table[data-target]').on('keyup', function(evt) {
    const tableId    = $(this).data('target'),
          searchText = evt.target.value.toLowerCase();

    $(tableId).find('tbody tr:not(.no-data)').each(function() {
        if ($(this).text().toLowerCase().indexOf(searchText) !== -1) {
            $(this).removeClass('hidden');
        } else {
            $(this).addClass('hidden');
        }
    });
});