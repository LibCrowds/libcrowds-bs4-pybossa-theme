/**
 * Scroll smoothly to internal anchors.
 */
$('a[href*=\\#]:not([href="#"])').on('click', function(evt) {
    let anchor = $($(this).attr('href'));
    setTimeout(function() {
        $('html, body').animate({
            scrollTop: anchor.offset().top
        }, 1000);
    }, 100);
    evt.preventDefault();
});