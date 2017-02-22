/**
 * Handle scroll and resize events.
 */
$(window).on("load resize scroll",function() {
    styleNavigation();
    styleJumbotrons();
});

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
            $('.navbar').addClass('navbar-inverse');
            $('.navbar').removeClass('navbar-light');
            return;
        }
    }
    $('.navbar').removeClass('navbar-inverse');
    $('.navbar').addClass('navbar-light');
}

/**
 * Handle clicking of a scroll button.
 */
$('.scroll-target').on('click', function() {
    const target    = $(this).data('target'),
          direction = $(this).data('direction');
    if (direction == 'left') {
        $(target).animate({scrollLeft: $(target).scrollLeft() - 400}, 300);
    } else if (direction == 'right') {
        $(target).animate({scrollLeft: $(target).scrollLeft() + 400}, 300);
    }
});