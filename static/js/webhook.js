$('.send-webhook').on('click', function() {
    const projectShortName = $(this).data('project-short-name'),
          webhookId        = $(this).data('webhook-id'),
          buttonHtml       = $(this).html(),
          row              = $(this).parents('tr');
    $(this).html('<span class="fa fa-spinner fa-spin"></span>');
    $.ajax({
        type: 'POST',
        url: `/project/${projectShortName}/webhook/${webhookId}`,
        dataType: 'json'
    }).done((data) => {
        $(this).html(buttonHtml);
        notify('Webhook sent!', 'success');
    });
});