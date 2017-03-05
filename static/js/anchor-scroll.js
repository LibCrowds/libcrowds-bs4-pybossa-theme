/**
 * Scroll smoothly to internal anchors.
 */
$('a[href*=\\#]').on('click', function(evt) {
    let anchor = $($(this).attr('href'));
    $('html, body').animate({
        scrollTop: anchor.offset().top - 40
    }, 1000);
    evt.preventDefault();
});