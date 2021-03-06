let scrollResizeEvents;

/**
 * Handle scroll and resize events.
 */
$(window).on("resize scroll",function() {
    styleNavigation();
    styleJumbotrons();
    displayScrollButtons();
});

styleNavigation();
styleJumbotrons();
displayScrollButtons();

/**
 * Handle styling of jumbotrons.
 */
function styleJumbotrons() {
    $('.jumbotron-fade').each(function() {
        if (document.body.scrollTop > $(this).offset().top) {
            $(this).addClass('brightness-50');
            $(this).children().addClass('opacity-50');
        } else {
            $(this).removeClass('brightness-50');
            $(this).children().removeClass('opacity-50');
        }
    });
}

/**
 * Handle styling of the navbar.
 */
function styleNavigation() {
    let bounds = [];
    $('.invert-navbar').each(function() {
        bounds.push([$(this).offset().top, $(this).offset().top + $(this).height()]);
    });

    for(let b of bounds) {
        if (document.body.scrollTop >= b[0] - 50 && document.body.scrollTop <= b[1] + 25) {
            $('.navbar-invertable').addClass('navbar-inverse');
            $('.navbar-invertable').removeClass('navbar-light');
            return;
        }
    }
    $('.navbar-invertable').removeClass('navbar-inverse');
    $('.navbar-invertable').addClass('navbar-light');
}

/**
 * Hide scroll buttons if siblings don't have overflow.
 */
function displayScrollButtons() {
    $('.btn-scroll').each(function() {
        const target = $($(this).data('target'))[0];
        if (target.offsetWidth < target.scrollWidth) {
            $(this).css('visibility', 'visible');
        } else {
            $(this).css('visibility', 'hidden');
        }
    });
}

export default scrollResizeEvents;