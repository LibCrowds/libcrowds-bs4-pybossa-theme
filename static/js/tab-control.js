/**
 * Show linked element when a .tab-control is clicked.
 * So we can still use tooltips while also toggling tab-like behaviour.
 */
$('a[href*=\\#].tab-control').on('click', function(evt) {
    var link = $(this).attr('href');
    $(link).show();
    $(link).siblings().hide();
    $(this).parent().siblings().removeClass('active');
    $(this).parent().addClass('active');
    evt.preventDefault();
});