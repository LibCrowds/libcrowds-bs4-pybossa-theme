/**
 * Handle clicking of a scroll button.
 */
$('.btn-scroll').on('click', function() {
    var target    = $(this).data('target'),
        direction = $(this).data('direction');
    if (direction == 'left') {
        $(target).animate({ scrollLeft: $(target).scrollLeft() - 400 }, 300);
    } else if (direction == 'right') {
        $(target).animate({ scrollLeft: $(target).scrollLeft() + 400 }, 300);
    }
});