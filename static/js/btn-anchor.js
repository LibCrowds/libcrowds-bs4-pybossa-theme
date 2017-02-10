/**
 * On click scroll to the element with the ID given in data-anchor.
 */
$('.btn-anchor').on('click', function(evt) {
    let anchor = $(this).attr('data-anchor');
    $('html, body').animate({
        scrollTop: $(anchor).offset().top - 40
    }, 1000);
    evt.preventDefault();
});