/** Set a timeout for resize and scroll events. */
$(window).on("load resize scroll",function() {
    if (!$('.navbar-scroll').length) {
        return;
    }
    
    if (!document.body.scrollTop) {
        $('.navbar').addClass('navbar-inverse');
        $('.navbar').removeClass('navbar-light');
        $('.navbar').removeClass('bg-white');
    } else {
        $('.navbar').removeClass('navbar-inverse');
        $('.navbar').addClass('navbar-light');
        $('.navbar').addClass('bg-white');
    }
});