import notify from './notify';

let webhook;

// Send a webhook when the button is clicked
$('.send-webhook').on('click', function() {
    var projectShortName = $(this).data('project-short-name'),
        webhookId        = $(this).data('webhook-id'),
        buttonHtml       = $(this).html(),
		_this            = $(this);
    
	$(this).html('<span class="fa fa-spinner fa-spin"></span>');
    
	$.ajax({
        type: 'POST',
        url: '/project/' + projectShortName + '/webhook/' + webhookId,
        dataType: 'json'
    }).done(function(data) {
        _this.html(buttonHtml);
        notify('Webhook sent!', 'success');
    });
});

export default webhook;
