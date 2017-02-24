/**
 * Show linked element when a card button with an internal link is clicked.
 * So we can have tooltips for buttons while also toggling tab-like behaviour.
 */
$('.card-button a[href*=\\#]').on('click', function(evt) {
    const link = $(this).attr('href');
    $(link).show();
    $(link).siblings().hide();
    $(this).parent().siblings().removeClass('active');
    $(this).parent().addClass('active');
    evt.preventDefault();
});