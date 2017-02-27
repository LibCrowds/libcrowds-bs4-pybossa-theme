$('.search-table[data-target]').on('keyup', function(evt) {
    const tableId    = $(this).data('target'),
          searchText = evt.target.value.toLowerCase(),
          columns    = $(tableId).find('thead tr th').length;
    console.log(columns);

    $(tableId).find('tbody tr.no-data').remove();

    $(tableId).find('tbody tr').each(function() {
        if ($(this).text().toLowerCase().indexOf(searchText) !== -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });

    if (!$(tableId).find('tbody tr:visible').length) {
        const noDataRow = $(`<tr class="no-data text-center">
                            <td colspan="${columns}">No data to show</td>
                            </tr>`);
        $(tableId).find('tbody').append(noDataRow);
    }
});