let styleNavbar;

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
    var styles       = [],
        ieScrollTop  = document.documentElement.scrollTop,
        scrollTop    = document.body.scrollTop === 0 ? ieScrollTop : document.body.scrollTop,
        addedClasses = $('.navbar').data('added-classes');

    $('[data-navbar-class]').each(function() {
        styles.push({
            class: $(this).data('navbar-class'),
            bounds: [
                $(this).offset().top,
                $(this).offset().top + $(this).height()
            ]
        });
    });

    for(var i = 0; i < styles.length; i++) {
        if (scrollTop >= styles[i]['bounds'][0] - 50 && scrollTop <= styles[i]['bounds'][1] + 25) {
            $('.navbar').removeClass(addedClasses);
            $('.navbar').addClass(styles['class']);
            $('.navbar').data('added-classes', styles['class']);
            return;
        }
    }

    $('.navbar').removeClass(addedClasses);
}

export default styleNavbar;
