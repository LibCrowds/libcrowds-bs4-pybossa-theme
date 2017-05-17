let token;

// Set X-CSRFToken header for ajax requests
if (document.getElementsByName('csrf_token')) {
    const csrfToken = document.getElementsByName('csrf_token')[0];
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrfToken);
            }
        }
    });    
}

export default token;