/**
 * Handle scroll and resize events.
 */
$(window).on("resize scroll", function() {
    styleNavigation();
}).trigger('resize');

/**
 * Handle styling of the navbar.
 */
function styleNavigation() {
    var bounds = [],
	    ieScrollTop = document.documentElement.scrollTop,
	    scrollTop   = document.body.scrollTop == 0 ? ieScrollTop : document.body.scrollTop;

    $('.invert-navbar').each(function() {
        bounds.push([
			$(this).offset().top, $(this).offset().top + $(this).height()
		]);
    });
	
    for(var i = 0; i < bounds.length; i++) {        
		if (scrollTop >= bounds[i][0] - 50 && scrollTop <= bounds[i][1] + 25) {
            $('.navbar-invertable').addClass('navbar-inverse');
            $('.navbar-invertable').removeClass('navbar-light');
            return;
        }
    }

    $('.navbar-invertable').removeClass('navbar-inverse');
    $('.navbar-invertable').addClass('navbar-light');
}