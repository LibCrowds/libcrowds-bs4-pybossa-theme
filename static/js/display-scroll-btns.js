$(window).on("resize", function() {
    displayScrollButtons();
}).trigger('resize');

/**
 * Hide scroll buttons if siblings don't have overflow.
 */
function displayScrollButtons() {
    $('.btn-scroll').each(function() {
        let target = $($(this).data('target'))[0];
        if (target.offsetWidth < target.scrollWidth) {
            $(this).css('visibility', 'visible');
        } else {
            $(this).css('visibility', 'hidden');
        }
    });
}