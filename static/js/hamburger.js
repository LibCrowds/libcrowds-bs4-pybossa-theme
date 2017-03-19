$('.hamburger').on('click', function(evt) {
    const targetId = $(this).data('target');
          timeout  = $(this).hasClass('is-active') ? 50 : 300;
    $(targetId).toggleClass('show');
    $(this).toggleClass('is-active');
    $(this).blur();
    
    setTimeout(() => {
        $(this).toggleClass('white');
    }, timeout);
})