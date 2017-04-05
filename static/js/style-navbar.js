/**
 * Handle scroll and resize events.
 */
$(window).on("resize scroll", function() {
    styleNavigation();
});

styleNavigation();

/**
 * Handle styling of the navbar.
 */
function styleNavigation() {
    var bounds = [];
    $('.invert-navbar').each(function() {
        bounds.push([
			$(this).offset().top, $(this).offset().top + $(this).height()
		]);
    });

    for(var i = 0; i < bounds.length; i++) {
        if (document.body.scrollTop >= bounds[i][0] - 50 && document.body.scrollTop <= bounds[i][1] + 25) {
            $('.navbar-invertable').addClass('navbar-inverse');
            $('.navbar-invertable').removeClass('navbar-light');
            return;
        }
    }

    $('.navbar-invertable').removeClass('navbar-inverse');
    $('.navbar-invertable').addClass('navbar-light');
}