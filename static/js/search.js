$('.search[data-target]').on('keyup', function(evt) {
    const searchText = evt.target.value.toLowerCase(),
          target     = $(this).data('target');

    $(target).each(function() {
        if ($(this).text().toLowerCase().indexOf(searchText) !== -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});