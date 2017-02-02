
/** Click the avatar button when edit-profile-image clicked. */
$('.edit-profile-image').on("click", function() {
    $('#avatar').click();
});





/** WORKING **/


/** On click scroll to the element with the ID given in data-anchor. */
$('.btn-anchor').click(function(evt) {
    let anchor = $(this).attr('data-anchor');
    $('html, body').animate({
        scrollTop: $(anchor).offset().top - 40
    }, 1000);
    evt.preventDefault();
});
