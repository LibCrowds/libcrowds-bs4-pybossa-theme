$(window).on("resize scroll", function() {
    fadeJumbotrons();
}).trigger('resize');

/**
 * Fade .jumbotron-fade when scrolling over.
 */
function fadeJumbotrons() {
    $('.jumbotron-fade').each(function() {
		var visiblePixels  = $(this).height() - document.body.scrollTop - $(this).offset().top,
		    visiblePercent = Math.round(visiblePixels * 100 / $(this).height()),
			stylePercent   = visiblePercent < 100 ? visiblePercent / 2 : 100;
		$(this).css('filter', 'brightness(' + stylePercent + '%)');
        $(this).children().css('opacity', stylePercent + '%');
    });
}