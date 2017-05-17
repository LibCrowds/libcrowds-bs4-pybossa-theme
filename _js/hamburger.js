let hamburger;

$('.hamburger').on('click', function(evt) {
	switchIcons($(this));
	switchColours($(this));
});

$(window).on("resize", function() {
    $('.hamburger').each(function() {
		switchIcons($(this));
	});
});

/**
 * Handle colour changes for full width menus.
 */
function switchColours(elem) {
	var targetId = elem.data('target'),
        timeout  = elem.hasClass('is-active') ? 50 : 300;
    
	$(targetId).toggleClass('show');
    elem.toggleClass('is-active');
    elem.blur();
    
    setTimeout(function() {
        elem.toggleClass('white');
    }, timeout);
}


/**
 * Use different icons for full and non-full width menus.
 */
 function switchIcons(elem) {
	if ($(window).width() > 992) {
		elem.removeClass('hamburger--collapse');
		elem.addClass('hamburger--arrow');
	} else {
		elem.addClass('hamburger--collapse');
		elem.removeClass('hamburger--arrow');
	}
 }
 
 export default hamburger;