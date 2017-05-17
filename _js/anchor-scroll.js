let anchorScroll;

/**
 * Scroll smoothly to internal anchors.
 */
$('a[href*=\\#]:not([href="#"]):not([data-toggle="tab"])').on('click', function(evt) {
    var anchor = $($(this).attr('href'));
    setTimeout(function() {
        $('html, body').animate({
            scrollTop: anchor.offset().top
        }, 1000);
    }, 100);
    evt.preventDefault();
});

export default anchorScroll;
