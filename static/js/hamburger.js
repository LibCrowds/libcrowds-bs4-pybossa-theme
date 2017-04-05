$('.hamburger').on('click', function(evt) {
    var targetId = $(this).data('target'),
        timeout  = $(this).hasClass('is-active') ? 50 : 300,
		_this    = $(this);
    
	
	$(targetId).toggleClass('show');
    $(this).toggleClass('is-active');
    $(this).blur();
    
    setTimeout(function() {
        _this.toggleClass('white');
    }, timeout);
});