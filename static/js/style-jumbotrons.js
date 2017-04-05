$(window).on("resize scroll", function() {
    styleJumbotrons();
});

styleJumbotrons();

/**
 * Fade .jumbotron-fade if not scrolled to top.
 */
function styleJumbotrons() {
    $('.jumbotron-fade').each(function() {
        if (document.body.scrollTop > $(this).offset().top) {
            $(this).addClass('brightness-50');
            $(this).children().addClass('opacity-50');
        } else {
            $(this).removeClass('brightness-50');
            $(this).children().removeClass('opacity-50');
        }
    });
}