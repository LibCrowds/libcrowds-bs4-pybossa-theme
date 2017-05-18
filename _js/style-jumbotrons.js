let styleJumbotrons;

$(window).on("resize scroll", function() {
    fadeJumbotrons();
}).trigger('resize');

/**
 * Fade .jumbotron-fade when scrolling over.
 */
function fadeJumbotrons() {
    $('.jumbotron-fade').each(function() {
		var ieScrollTop    = document.documentElement.scrollTop,
	        scrollTop      = document.body.scrollTop === 0 ? ieScrollTop : document.body.scrollTop,
		    visiblePixels  = $(this).height() - scrollTop - $(this).offset().top,
		    visiblePercent = Math.round(visiblePixels * 100 / $(this).height()),
			brightness     = visiblePercent < 100 ? visiblePercent / 2 : 100,
			opacity        = visiblePercent < 100 ? visiblePercent / 10 : 1;

		$(this).css('filter', 'brightness(' + brightness + '%)');
        $(this).children().css('opacity', opacity);
    });
}

export default styleJumbotrons;
